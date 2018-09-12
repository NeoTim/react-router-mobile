import { Model } from '../statmen'

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

function getPageBlock(
  children: JSX.Element[],
  displayName: string,
): JSX.Element {
  const block = children.find(
    (item: any) => item.type.displayName === displayName,
  )

  if (!block) {
    throw new Error('no page block')
  }
  return block
}

class PageStore extends Model {
  state: State = {
    pages: [],
    mountedPages: [],
    currentPage: null,
  }

  init(pages: JSX.Element[]) {
    const pageData = pages.map(page => {
      return {
        path: page.props.path,
        component: page,
        default: !!page.props.default,
      }
      if (isSimple(page)) {
        return {
          path: page.props.path,
          component: page,
          default: !!page.props.default,
        }
      } else {
        const { children } = page.props
        console.log('pages children:', children)
        const header = getPageBlock(children, 'Header')
        const body = getPageBlock(children, 'Connect(Body)')
        const footer = getPageBlock(children, 'Footer')

        const subPages = body.props.children.map(item => ({
          path: item.props.path,
          component: item,
        }))

        return {
          path: page.props.path,
          component: page,
          default: !!page.props.default,
          header,
          footer,
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
  }
}

export default new PageStore()
