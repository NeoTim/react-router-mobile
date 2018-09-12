import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { connect } from '../statmen'
import PageStore from '../stores/PageStore'

interface Prop {
  [propName: string]: any
}

class Body extends React.Component<Prop> {
  componentDidMount = () => {
    // const { pages } = this.props
    // const { pageStore } = this.props
    // pageStore.init(pages)
    // const defaultPage = this.getDefaultPage()
    // pageStore.add(defaultPage)
  }

  getSubPages = () => {
    const { pageStore } = this.props
    const { currentPage } = pageStore.state
    console.log('currentPage:', currentPage)
    const { subPages } = currentPage
    return subPages
  }

  render() {
    const subPages = this.getSubPages()

    return (
      <TransitionGroup class="body">
        {subPages.map((page, index) => (
          <CSSTransition key={index} timeout={400} classNames="fade">
            <div className="sub-page">{page.component}</div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

export default connect([PageStore])(Body)
