import * as React from 'react'

import { contextStruct } from './PropTypes'

interface Prop {
  [propName: string]: any
}

export default class Provider extends React.Component<Prop> {
  static childContextTypes = {
    store: contextStruct,
  }

  state = {
    stores: this.props.store,
  }

  getChildContext() {
    return {
      // store: this.props.store,
      store: { foo: 'aa' },
    }
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}
