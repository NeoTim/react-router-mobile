import * as React from 'react'
import navigate from '../navigate'

interface Props {
  children: any[]
  to: string
}

class RouterLink extends React.Component<Props> {
  go() {
    const { to } = this.props
    navigate(to)
  }

  renderChildren(children) {
    return <div onClick={this.go}>{children}</div>
  }

  renderChild(children) {
    const child = children[0]
    child.attributes = child.attributes || {}
    child.attributes.onClick = this.go.bind(this)
    return child
  }

  render() {
    const { children } = this.props
    if (!children || !children.length) return null
    return children.length > 1
      ? this.renderChildren(children)
      : this.renderChild(children)
  }
}

export default RouterLink
