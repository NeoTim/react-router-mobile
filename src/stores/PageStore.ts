import * as React from 'react'

import { Model } from '../statmen'

export interface State {
  pages: React.ReactNode[]
  mountedPages: React.ReactNode[]
}

class PageStore extends Model {
  state: State = {
    pages: [],
    mountedPages: [],
  }

  init(pages) {
    this.setState({ pages })
  }

  add(page) {
    this.setState({ mountedPages: [...this.state.mountedPages, page] })
    console.log('MOUNTED_PAGES:', this.state.mountedPages)
  }

  back() {
    this.setState({ mountedPages: this.state.mountedPages.slice(0, -1) })
    console.log('MOUNTED_PAGES:', this.state.mountedPages)
  }
}

export default new PageStore()
