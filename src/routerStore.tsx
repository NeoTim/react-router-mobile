import { create } from 'mistate'
import {
  last,
  lastButOne,
  pushState,
  replaceState,
  setZIndex,
  resetZIndex,
  convertToPages,
  setMounted,
  findWithParent,
  findExact,
} from './util'

import { Page } from './typings'

export interface State {
  pages: Page[]
  mountedPages: Page[]
  currentPage?: Page
}

const initialState: State = {
  pages: [],
  mountedPages: [],
}

const { get, set, getState } = create(initialState)

const actions = {
  async init(pages: React.ReactNodeArray) {
    const initedPages = convertToPages(pages, '', true)
    return await set({ pages: initedPages })
  },

  isBack(pageParent: Page): boolean {
    const { mountedPages } = getState()
    try {
      const page: Page = lastButOne(mountedPages)

      // 如果目标path和倒数第二个page path 一致，那就是返回
      return pageParent.fullPath === page.fullPath
    } catch (e) {
      console.log('e:', e)
      return false
    }
  },

  go(path: string, replace?: boolean) {
    const { pages, mountedPages } = getState()
    const pageParent = findWithParent(mountedPages, path)
    const pageExact = findExact(mountedPages, path)

    // add new page
    if (!pageParent) {
      const page = findWithParent(pages, path)
      if (!page) throw new Error('no page match')
      this.add(page)
      replace ? replaceState(path) : pushState(path)
      return
    }

    // go back
    if (this.isBack(pageParent)) {
      this.back()
      return
    }

    //  activate nest page
    if (pageExact && !pageExact.mounted) {
      this.activeNest(path)
      replace ? replaceState(path) : pushState(path)
      return
    }

    // switch nest page
    const { currentPage } = getState()
    if (currentPage) {
      resetZIndex()
      setZIndex(currentPage, path)
    }
  },

  activeNest(path: string) {
    const { mountedPages } = getState()
    set({
      mountedPages: setMounted(mountedPages, path),
    })
  },

  add(page: Page) {
    const { mountedPages } = getState()
    set({
      currentPage: page,
      mountedPages: [...mountedPages, { ...page, mounted: true }],
    })
  },

  async back() {
    const { mountedPages } = getState()
    if (mountedPages.length < 2) {
      throw new Error('Can not go back because no history')
    }
    await set({ mountedPages: mountedPages.slice(0, -1) })
    if (!getState().mountedPages.length) return
    const currentPage = last(getState().mountedPages)
    replaceState(currentPage.path)
  },
}

export { get, set, actions }
