import { create } from 'mistate'
import {
  last,
  pushState,
  replaceState,
  setZIndex,
  resetZIndex,
  convertToPages,
  setMounted,
  pickParent,
  pickExact,
} from './util'

import Page from './interfaces/Page'

export interface State {
  pages: Page[]
  test?: any
  mountedPages: Page[]
  currentPage?: Page
}

const initialState: State = {
  pages: [],
  mountedPages: [],
  test: 'init',
}

const { get, set, getState } = create(initialState)

const actions = {
  async init(pages) {
    const initedPages = convertToPages(pages, '', true)
    console.log('initedPages:', initedPages)
    return await set({ pages: initedPages })
  },

  go(path: string, replace?: boolean) {
    const { pages, mountedPages } = getState()
    console.log('mountedPages:', mountedPages)

    const pageExisted = pickParent(mountedPages, path)
    const pageExact = pickExact(mountedPages, path)

    if (!pageExisted) {
      const page = pickParent(pages, path)
      if (!page) throw new Error('no page match')
      this.add(page)
      replace ? replaceState(path) : pushState(path)
      return
    }

    // 浏览器后退按钮操作
    if (pageExisted.isRoot && !pageExact) {
      this.back()
      return
    }

    if (pageExact && !pageExact.mounted) {
      this.activeNest(path)
      replace ? replaceState(path) : pushState(path)
      return
    }

    const { currentPage } = getState()
    resetZIndex()
    setZIndex(currentPage, path)
  },

  activeNest(path: string) {
    const { mountedPages } = getState()
    set({
      mountedPages: setMounted(mountedPages, path),
    })
  },

  add(page) {
    const { mountedPages } = getState()
    set({
      currentPage: page,
    })

    set({
      mountedPages: [...mountedPages, { ...page, mounted: true }],
    })
  },

  async back() {
    const { mountedPages } = getState()
    await set({ mountedPages: mountedPages.slice(0, -1) })
    if (!getState().mountedPages.length) return
    const currentPage = last(getState().mountedPages)
    replaceState(currentPage.path)
  },
}

export { get, set, actions }
