import Path from 'path-parser'

import Page from './interfaces/Page'
import { CLASS_PREFIX } from './constant'

export {
  pushState,
  replaceState,
  last,
  getPath,
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

function getPath(): string {
  const { pathname } = window.location
  return pathname
}

function resetZIndex() {
  const selector = `.${CLASS_PREFIX}`
  const $subPages = document.querySelectorAll(selector)
  const $nodeArr = [].slice.call($subPages)
  $nodeArr.forEach(node => {
    node.style['z-index'] = 1
  })
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

// TODO
function pickExact(pages: Page[] = [], path: string) {
  let cmp

  const find = (source, targetPath: string) => {
    source.forEach(page => {
      const parser = new Path(page.fullPath)
      if (parser.test(targetPath)) {
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
      const parser = new Path(page.fullPath)
      return parser.test(path)
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
