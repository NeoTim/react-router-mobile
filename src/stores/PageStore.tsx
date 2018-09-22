import Path from 'path-parser'

import { Model } from '../statmen'
import { last, replaceState } from '../util'

interface Page {
  path: string
  fullPath?: string
  children?: any[]
  animation?: string
  component: any
}

export interface State {
  pages: Page[]
  mountedPages: Page[]
}

function resetZIndex() {
  const $subPages = document.querySelectorAll('.sub-page')
  const $nodeArr = [].slice.call($subPages)
  $nodeArr.forEach(node => {
    node.style['z-index'] = 1
  })
}

// TODO
function pickExact(pages = [], path: string) {
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
  const find = item => {
    if (!item.children || !item.children.length) {
      const parser = new Path(item.fullPath)
      return parser.test(path)
    } else {
      return item.children.find(i => find(i))
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
      children: travalMounted(page.children, page),
    }
  })
}

function getSelector(fullPath: string) {
  if (fullPath === '/') {
    return 'page-base'
  }
  const prefix = 'page-'
  const selector = fullPath
    .split('/')
    .filter(i => i)
    .join('-')
    .replace(':', 'colon-')
  return prefix + selector
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
    const pageExisted = pickParent(mountedPages, path)

    // 浏览器后退按钮操作
    // if (pageExisted && !pageExisted.parent) {
    if (pageExisted) {
      // debugger
      this.back()
    } else {
      // debugger
      const page = pickParent(pages, path)
      if (!page) throw new Error('no page match')
      this.add(page)
    }
  }

  add(page) {
    const { mountedPages } = this.state
    this.setState({
      mountedPages: [...mountedPages, page],
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
