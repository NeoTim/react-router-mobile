import { Model } from 'stamen'
import {
  last,
  replaceState,
  getSelector,
  setZIndex,
  resetZIndex,
  pickParent,
  pickExact,
} from '../util'

import Page from '../interfaces/Page'

export interface State {
  pages: Page[]
  mountedPages: Page[]
  currentPage: Page | null
}

function travalJSX(pages, path = '', isRoot = true) {
  return pages.map(page => {
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
      children: travalJSX(childrenArray, fullPath, false),
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

export class PageStore extends Model {
  state: State = {
    pages: [],
    mountedPages: [],
    currentPage: null,
  }

  init(pages: Page[]) {
    const initedPages = travalJSX(pages, '', true)
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

    const { currentPage } = this.state
    resetZIndex()
    setZIndex(currentPage, path)
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
      currentPage: page,
    })

    this.setState({
      mountedPages: [...mountedPages, { ...page, mounted: true }],
    })
  }

  back() {
    this.setState({ mountedPages: this.state.mountedPages.slice(0, -1) })
    console.log('MOUNTED_PAGES:', this.state.mountedPages)
    if (!this.state.mountedPages.length) return
    const currentPage = last(this.state.mountedPages)
    replaceState(currentPage.path)
  }
}

export default new PageStore()
