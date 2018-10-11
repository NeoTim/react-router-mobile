import * as React from 'react'
import Path from 'path-parser'
import { CSSTransition } from 'react-transition-group'

import { Page } from './typings'
import { CLASS_PREFIX } from './constant'

export {
  pushState,
  replaceState,
  last,
  lastButOne,
  matchPath,
  partialMatchPath,
  getPath,
  setZIndex,
  resetZIndex,
  getSelector,
  convertToPages,
  setMounted,
  findExact,
  findWithParent,
  createPage,
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

function lastButOne(arr: any[]) {
  if (arr.length < 2) {
    throw new Error('array length should > 2')
  }
  return arr[arr.length - 2]
}

function matchPath(pagePath: string, clientPath: string): object | null {
  const parser = new Path(pagePath)
  return parser.test(clientPath)
}

function partialMatchPath(pagePath: string, clientPath: string): object | null {
  const parser = new Path(pagePath)
  return parser.partialTest(clientPath)
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
        if (partialMatchPath(page.fullPath, path)) {
          selectors.push(page.selector)
        }
        return
      }

      if (partialMatchPath(page.fullPath, path)) {
        selectors.push(page.selector)
      }
      travalPage(page.children)
    })
  }
  travalPage([currentPage])
  return selectors
}

function setZIndex(currentPage: Page, path: string) {
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
  const $nodeArr: HTMLElement[] = [].slice.call($subPages)
  $nodeArr.forEach(node => {
    node.style['z-index'] = 1
  })
}

function convertToPages(
  pages: React.ReactNodeArray,
  path = '',
  isRoot = true,
): any {
  console.log('pages:', pages)
  if (!pages || !pages.length) return
  return pages.map((page: React.ReactElement<any>) => {
    const { path: pagePath, animation = '', children } = page.props
    const fullPath = path + pagePath
    const selector = getSelector(fullPath)

    if (!children) {
      return {
        component: page,
        path: pagePath,
        fullPath,
        selector,
        animation,
        isRoot,
      }
    }

    const childrenArray = children.length ? children : [children]

    return {
      component: page,
      path: pagePath,
      fullPath,
      selector,
      animation,
      isRoot,
      children: convertToPages(childrenArray, fullPath, false),
    }
  })
}

function setMounted(pages: Page[], path = ''): Page[] {
  return pages.map(page => {
    const mounted = !!partialMatchPath(page.fullPath, path)
    if (!page.children || !page.children.length) {
      if (!mounted) return page
      return {
        ...page,
        mounted,
      }
    }

    if (!mounted) {
      return {
        ...page,
        children: setMounted(page.children, path),
      }
    }

    return {
      ...page,
      mounted,
      children: setMounted(page.children, path),
    }
  })
}

function findExact(pages: Page[] = [], path: string): Page | null {
  let cmp: Page | null = null

  const finder = (sourcePages: Page[], targetPath: string) => {
    sourcePages.forEach(page => {
      if (matchPath(page.fullPath, targetPath)) {
        cmp = page
        return
      }

      if (page.children && page.children.length) {
        finder(page.children, targetPath)
      }
    })
  }

  finder(pages, path)
  return cmp
}

/**
 * find the matched root page
 * @param pages
 * @param path
 */
function findWithParent(pages: Page[] = [], path: string): Page | null {
  if (!pages.length) return null

  const finder: any = (page: Page) => {
    if (!page.children || !page.children.length) {
      return matchPath(page.fullPath, path)
    } else {
      return page.children.find(subPage => finder(subPage))
    }
  }

  const finded = pages.find(page => finder(page))
  if (!finded) {
    return null
  }

  const [picked] = travalMounted([finded], path)
  return picked
}

function travalMounted(configs: any = [], path = '') {
  return configs.map((page: any) => {
    const mounted = !!partialMatchPath(page.fullPath, path)
    const hasChilden = page.children && page.children.length
    if (hasChilden) return { ...page, mounted }

    return {
      ...page,
      mounted,
      children: travalMounted(page.children, path),
    }
  })
}

function createPage(pages: Page[]) {
  return pages.map((page, index) => {
    if (!page.mounted) return null
    const className = `${CLASS_PREFIX} ${page.selector}`
    const pageProps = {
      className,
      style: { zIndex: 2 },
    }

    const params = partialMatchPath(page.fullPath, getPath()) || {}

    if (!page.children || !page.children.length) {
      return (
        <CSSTransition
          key={index}
          timeout={400}
          classNames={page.animation || ''}
        >
          <div {...pageProps}>
            {React.cloneElement(page.component, { params })}
          </div>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition
        key={index}
        timeout={400}
        classNames={page.animation || ''}
      >
        <div {...pageProps}>
          {React.cloneElement(
            page.component,
            { params },
            createPage(page.children),
          )}
        </div>
      </CSSTransition>
    )
  })
}
