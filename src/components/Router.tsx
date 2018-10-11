import * as React from 'react'
import { TransitionGroup } from 'react-transition-group'

import { getPath, createPage } from '../util'
import navigate from '../navigate'
import { get, actions } from '../routerStore'

interface Prop {
  // TODO: need handle React.ReactElement
  children: React.ReactNodeArray
}

class Router extends React.Component<Prop> {
  handlePop = () => {
    navigate(getPath())
  }

  componentDidMount = async () => {
    addEventListener('popstate', this.handlePop)
    await actions.init(this.props.children)
    actions.go(getPath())
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.handlePop)
  }

  render() {
    return get(state => {
      const { mountedPages } = state
      if (!mountedPages.length) return null
      return (
        <TransitionGroup className="rrm-pages">
          {createPage(mountedPages)}
        </TransitionGroup>
      )
    })
  }
}

export default Router
