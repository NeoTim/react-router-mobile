import Path from 'path-parser'

import Page from './interfaces/Page'
import { CLASS_PREFIX } from './constant'

export {
  pushState,
  replaceState,
  last,
  matchPath,
  getPath,
  setZIndex,
  resetZIndex,
  getSelector,
  pickExact,
  pickParent,
}

function pushState(url: string): void {
  history.pushState(null, '', url)
}
function replaceState(url: string): void {
  history.replaceState(null, '', url)
}

function last(arr: any[]) {
  return arr[arr.length - 1]
}

function matchPath(pagePath: string, clientPath: string): object | null {
  const parser = new Path(pagePath)
  return parser.test(clientPath)
}

function getPath(): string {
  const { pathname } = window.location
  return pathname
}

function getSelector(fullPath: string) {
  if (fullPath === '/') {
    return `${CLASS_PREFIX}-base`
  }
  const prefix = `${CLASS_PREFIX}-`
  const selector = fullPath
    .split('/')
    .filter(i => i)
    .join('-')
    .replace(':', 'colon-')
  return prefix + selector
}

function getSelectors(currentPage: Page, path: string) {
  const selectors: string[] = []
  function travalPage(pages: Page[]) {
    pages.forEach((page: Page) => {
      if (!page.children || !page.children.length) {
        if (path.indexOf(page.fullPath) > -1) {
          selectors.push(page.selector)
        }
        return
      }

      if (path.indexOf(page.fullPath) > -1) {
        selectors.push(page.selector)
      }
      travalPage(page.children)
    })
  }
  travalPage([currentPage])
  return selectors
}

function setZIndex(currentPage, path: string) {
  const selectors = getSelectors(currentPage, path)
  selectors.forEach(item => {
    const selector = '.' + item
    const $page: HTMLElement | null = document.querySelector(selector)
    if ($page) {
      $page.style['z-index'] = 2
    }
  })
}

function resetZIndex() {
  const selector = `.${CLASS_PREFIX}`
  const $subPages = document.querySelectorAll(selector)
  const $nodeArr = [].slice.call($subPages)
  $nodeArr.forEach(node => {
    node.style['z-index'] = 1
  })
}

// TODO
function pickExact(pages: Page[] = [], path: string) {
  let cmp

  const find = (source, targetPath: string) => {
    source.forEach(page => {
      if (matchPath(page.fullPath, targetPath)) {
        cmp = page
        return
      }

      if (page.children && page.children.length) {
        find(page.children, targetPath)
      }
    })
  }

  find(pages, path)
  return cmp
}

function pickParent(pages: Page[] = [], path: string) {
  if (!pages.length) {
    return null
  }
  const find = page => {
    if (!page.children || !page.children.length) {
      return matchPath(page.fullPath, path)
    } else {
      return page.children.find(i => find(i))
    }
  }

  const finded = pages.find(page => find(page))
  if (!finded) {
    return null
  }
  const [picked] = travalMounted([finded], path)
  return picked
}

function travalMounted(configs: any = [], path = '') {
  return configs.map(page => {
    // TODO
    const mounted = path.indexOf(page.fullPath) > -1
    if (!page.children || !page.children.length) {
      return { ...page, mounted }
    }

    return {
      ...page,
      mounted,
      children: travalMounted(page.children, path),
    }
  })
}
