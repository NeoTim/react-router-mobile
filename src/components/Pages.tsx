import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Path from 'path-parser'

import ROUTERS from '../routers'
import { getPath } from '../util'
import { connect } from '../statmen'
import PageStore from '../stores/PageStore'

const EMPTY = ''

// event
function bindEvent() {
  if (typeof addEventListener !== 'function') return
  addEventListener('popstate', () => ROUTERS[0] && ROUTERS[0].go(getPath()))
}

bindEvent()

interface Prop {
  [propName: string]: any
}

class Pages extends React.Component<Prop> {
  current: string = EMPTY

  state = {
    path: EMPTY,
  }

  public go = (path: string) => {
    const { pageStore } = this.props
    const { pages, mountedPages } = pageStore.state
    const pageExisted = this.getPageByPath(mountedPages, path)

    // 浏览器后退按钮操作
    if (pageExisted) {
      pageStore.back()
    } else {
      const page = this.getPageByPath(pages, path)
      if (!page) throw new Error('no page match')
      pageStore.add(page)
    }
  }

  setCurrentName = path => {
    this.current = path
  }

  getPageByPath = (pages, path: string) => {
    return pages.find(page => {
      const route = new Path(page.path)
      return route.test(path)
    })
  }

  componentWillMount() {
    ROUTERS.push(this)
    window.ROUTERS = ROUTERS
  }

  componentDidMount = () => {
    const { pages } = this.props
    const { pageStore } = this.props
    pageStore.init(pages)

    const defaultPage = this.getPageByPath(pageStore.state.pages, getPath())
    pageStore.add(defaultPage)
  }

  render() {
    const { pageStore } = this.props
    const { mountedPages } = pageStore.state
    console.log('mountedPages:', mountedPages)

    return (
      <TransitionGroup class="pages">
        {mountedPages.map((page, index) => (
          <CSSTransition
            key={index}
            timeout={400}
            classNames={page.component.props.animation}
          >
            <div className="page">{page.component}</div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

export default connect([PageStore])(Pages)
