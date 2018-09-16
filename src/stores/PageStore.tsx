import Path from 'path-parser'

import { Model } from '../statmen'
import { last, replaceState } from '../util'

interface Page {
  path: string
  fullPath?: string
  routes?: any[]
  animation?: string
  component: any
}

export interface State {
  pages: Page[]
  mountedPages: Page[]
  currentPage: Page | null
}

function resetZIndex() {
  const $subPages = document.querySelectorAll('.sub-page')
  const $nodeArr = [].slice.call($subPages)
  $nodeArr.forEach(node => {
    node.style['z-index'] = 1
  })
}

// TODO
function getPageByPath(pages, path: string) {
  let page

  pages.forEach(item => {
    const route = new Path(item.path)
    if (route.test(path)) {
      page = { ...item }
      return
    }

    const reg = new RegExp(`^${item.path}`)
    if (reg.test(path)) {
      if (!item.routes.length) return
      item.routes.forEach(subItem => {
        console.log('path:', path)
        console.log('subItem.fullPath:', subItem.fullPath)
        if (path === subItem.fullPath) {
          page = { ...subItem }
        }
      })
    }
  })
  return page
}

class PageStore extends Model {
  state: State = {
    pages: [],
    mountedPages: [],
    currentPage: null,
  }

  init(pages: Page[]) {
    console.log('pages:', pages)
    const initedPages = pages.map((page: Page) => {
      if (!page.routes || !page.routes.length) {
        return { ...page, fullPath: page.path, routes: [] }
      }
      console.log('page.routes:', page.routes)
      const newRoutes = page.routes.map(route => {
        const fullPath = page.path + route.path
        const className = fullPath
          .split('/')
          .filter(i => i)
          .join('-')
        return {
          ...route,
          parent: page.path,
          className: `sub-page-${className}`,
          fullPath,
        }
      })

      return {
        ...page,
        fullPath: page.path,
        routes: newRoutes,
      }
    })
    this.setState({ pages: initedPages })
    console.log('init pages:', this.state.pages)
  }

  go(path: string) {
    const { pages, mountedPages } = this.state
    const pageExisted = getPageByPath(mountedPages, path)

    // 浏览器后退按钮操作
    if (pageExisted && !pageExisted.parent) {
      this.back()
    } else {
      const page = getPageByPath(pages, path)
      if (!page) throw new Error('no page match')
      this.add(page)
    }
  }

  add(page) {
    const { pages, mountedPages } = this.state

    // 如果不存在parent page
    if (!page.parent) {
      const current = page.routes ? { ...page, routes: [] } : page
      this.setState({
        mountedPages: [...mountedPages, current],
      })
      return
    }

    const parentPage: any = mountedPages.find(item => item.path === page.parent)

    // TODO
    // mounted 不存在parent page
    if (!parentPage) {
      const parent = getPageByPath(pages, page.parent)
      parent.routes = [page]
      console.log('parent:', [...mountedPages, parent])
      this.setState({
        mountedPages: [...mountedPages, parent],
      })
      console.log('mounted:', this.state.mountedPages)
      return
    }

    // mounted 存在 parent page
    const newMountedPages = mountedPages.map((item: any) => {
      if (parentPage.path === item.path) {
        const find = item.routes.find(r => r.fullPath === page.fullPath)
        console.log('find:', find)
        if (!find) {
          resetZIndex()
          item.routes.push(page)
        } else {
          resetZIndex()
          const $current: any = document.querySelector(`.${page.className}`)
          console.log('$current:', $current)
          $current.style['z-index'] = 2
        }
      }
      return item
    })
    console.log('newMountedPages:', newMountedPages)

    this.setState({
      mountedPages: newMountedPages,
    })
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
