import * as React from 'react'

interface Prop {
  [propName: string]: any
}

class Route extends React.Component<Prop> {
  render() {
    const { component: Page } = this.props
    return <Page />
  }
}

export default Route
