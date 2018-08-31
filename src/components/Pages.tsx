import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
    const page = this.getPageByPath(path)
    pageStore.add(page)
  }

  setCurrentName = path => {
    this.current = path
  }

  getPageByPath = (path: string) => {
    const { pages } = this.props
    return pages.find(page => page.props.path === path)
  }

  getDefaultPage = () => {
    const { pages } = this.props
    return pages.find(page => page.props.default)
  }

  componentWillMount() {
    ROUTERS.push(this)
    window.ROUTERS = ROUTERS
  }

  componentDidMount = () => {
    const { pages } = this.props
    const { pageStore } = this.props
    pageStore.init(pages)
    const defaultPage = this.getDefaultPage()
    pageStore.add(defaultPage)
  }

  render() {
    const { pageStore } = this.props
    const { mountedPages } = pageStore.state

    return (
      <TransitionGroup class="pages">
        {mountedPages.map((page, index) => (
          <CSSTransition
            key={index}
            timeout={400}
            classNames={page.props.animation}
          >
            <div className="page">{page}</div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

export default connect([PageStore])(Pages)
