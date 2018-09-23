import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { getPath } from '../util'
import { connect } from '../statmen'
import PageStore from '../stores/PageStore'
import navigate from '../navigate'
import { CLASS_PREFIX } from '../constant'

interface Prop {
  [propName: string]: any
}

class Router extends React.Component<Prop> {
  handlePop = () => {
    navigate(getPath())
  }

  componentDidMount = () => {
    const { pageStore } = this.props
    addEventListener('popstate', this.handlePop)
    pageStore.init(this.props.children)
    pageStore.go(getPath())
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.handlePop)
  }

  render() {
    const { pageStore } = this.props
    const { mountedPages } = pageStore.state
    console.log('mountedPages:', mountedPages)
    if (!mountedPages.length) return null
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
    if (!page.mounted) return null
    const className = `${CLASS_PREFIX} ${page.selector}`
    const pageProps = {
      className,
      style: { zIndex: 2 },
    }
    console.log('page:------------')
    console.log('page:', page)

    if (!page.children || !page.children.length) {
      return (
        <CSSTransition key={index} timeout={400} classNames={page.animation}>
          <div {...pageProps}>
            {React.cloneElement(page.component, { hx: 'xxxk' })}
          </div>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition key={index} timeout={400} classNames={page.animation}>
        <div {...pageProps}>
          {React.cloneElement(page.component, {}, createPage(page.children))}
        </div>
      </CSSTransition>
    )
  })
}
