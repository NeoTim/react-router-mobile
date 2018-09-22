import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { getPath } from '../util'
import { connect } from '../statmen'
import PageStore from '../stores/PageStore'
import navigate from '../navigate'

interface Prop {
  [propName: string]: any
}

class Router extends React.Component<Prop> {
  handlePop = () => {
    navigate(getPath())
  }

  componentDidMount = () => {
    const { routes } = this.props
    const { pageStore } = this.props
    addEventListener('popstate', this.handlePop)
    pageStore.init(routes)
    pageStore.go(getPath())
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.handlePop)
  }

  render() {
    const { pageStore } = this.props
    const { mountedPages } = pageStore.state
    console.log('mountedPages:', mountedPages)

    return (
      <TransitionGroup class="pages">
        {createPage(mountedPages)}
      </TransitionGroup>
    )
  }
}

export default connect([PageStore])(Router)

function createPage(pages) {
  return pages.map((page, index) => {
    const Page = page.component
    if (!page.children || !page.children.length) {
      return (
        <CSSTransition key={index} timeout={400} classNames={page.animation}>
          <div className="page" style={{ zIndex: 1 }}>
            <Page />
          </div>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition key={index} timeout={400} classNames={page.animation}>
        <div className="page" style={{ zIndex: 1 }}>
          <Page>{createPage(page.children)}</Page>
        </div>
      </CSSTransition>
    )
  })
}
