import { Model } from '../statmen'
import { last, replaceState } from '../util'

interface Page {
  path: string
}

export interface State {
  pages: Page[]
  mountedPages: Page[]
  currentPage: Page | null
}

/**
 * if no children, it is a simple page
 * @param page
 */
function isSimple(page: JSX.Element): boolean {
  return !page.props.children
}

class PageStore extends Model {
  state: State = {
    pages: [],
    mountedPages: [],
    currentPage: null,
  }

  init(pages: JSX.Element[]) {
    const pageData = pages.map(page => {
      if (isSimple(page)) {
        return {
          path: page.props.path,
          component: page,
          default: !!page.props.default,
        }
      } else {
        const { children } = page.props
        console.log('pages children:', children)
        const subPages = children.map(item => ({
          path: item.props.path,
          component: item,
        }))

        return {
          path: page.props.path,
          component: page,
          default: !!page.props.default,
          subPages,
        }
      }
    })

    console.log('init pages:', pageData)

    this.setState({ pages: pageData })
  }

  add(page) {
    const current = { ...page, active: true }
    this.setState({
      mountedPages: [...this.state.mountedPages, current],
      currentPage: current,
    })
  }

  back() {
    this.setState({ mountedPages: this.state.mountedPages.slice(0, -1) })
    console.log('MOUNTED_PAGES:', this.state.mountedPages)
    const { path } = last(this.state.mountedPages)
    console.log('path:', path)
    replaceState(path)
  }
}

export default new PageStore()
