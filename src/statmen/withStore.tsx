import * as React from 'react'

import Context from './Context'

export default function withStore(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {store => {
            const props = { ...this.props, store }
            return <WrappedComponent {...props} />
          }}
        </Context.Consumer>
      )
    }
  }
}
