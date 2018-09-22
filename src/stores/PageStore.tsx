import { Model } from '../statmen'
import {
  last,
  replaceState,
  getSelector,
  resetZIndex,
  pickParent,
  pickExact,
} from '../util'

import Page from '../interfaces/Page'

export interface State {
  pages: Page[]
  mountedPages: Page[]
}

function traval(configs, path = '', isRoot = true) {
  return configs.map(page => {
    const fullPath = path + page.path
    const selector = getSelector(fullPath)

    if (!page.children || !page.children.length) {
      return {
        ...page,
        fullPath,
        selector,
        className: selector,
        isRoot,
        children: [],
      }
    }

    const parentPath = page.path
    return {
      ...page,
      parentPath,
      fullPath,
      selector,
      className: selector,
      isRoot,
      children: traval(page.children, fullPath, false),
    }
  })
}

function travalNest(pages, path = '') {
  return pages.map(page => {
    // TODO
    const mounted = path.indexOf(page.fullPath) > -1
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
        children: travalNest(page.children, path),
      }
    }

    return {
      ...page,
      mounted,
      children: travalNest(page.children, path),
    }
  })
}

class PageStore extends Model {
  state: State = {
    pages: [],
    mountedPages: [],
  }

  init(pages: Page[]) {
    const initedPages = traval(pages, '', true)
    console.log('initedPages:', initedPages)
    this.setState({ pages: initedPages })
    console.log('init pages:', this.state.pages)
  }

  go(path: string) {
    const { pages, mountedPages } = this.state
    console.log('mountedPages:', mountedPages)

    const pageExisted = pickParent(mountedPages, path)
    const pageExact = pickExact(mountedPages, path)

    if (!pageExisted) {
      const page = pickParent(pages, path)
      if (!page) throw new Error('no page match')
      this.add(page)
      return
    }

    // 浏览器后退按钮操作
    if (pageExisted.isRoot && !pageExact) {
      this.back()
      return
    }

    if (pageExact && !pageExact.mounted) {
      this.activeNest(path)
    }

    resetZIndex()

    const selector = '.' + getSelector(path)
    const $page: HTMLElement | null = document.querySelector(selector)
    if ($page) {
      $page.style['z-index'] = 2
    }
  }

  activeNest(path: string) {
    const { mountedPages } = this.state
    this.setState({
      mountedPages: travalNest(mountedPages, path),
    })
  }

  add(page) {
    const { mountedPages } = this.state
    this.setState({
      mountedPages: [...mountedPages, { ...page, mounted: true }],
    })

    window.PAGES = this.state.mountedPages
  }

  back() {
    this.setState({ mountedPages: this.state.mountedPages.slice(0, -1) })
    console.log('MOUNTED_PAGES:', this.state.mountedPages)
    if (!this.state.mountedPages.length) return
    const { path } = last(this.state.mountedPages)
    replaceState(path)
  }
}

export default new PageStore()
