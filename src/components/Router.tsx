import * as React from 'react'

import { Provider } from '../statmen'
import Pages from './Pages'

interface Props {
  children: any[]
}

interface State {
  path: string
}

class Router extends React.Component<Props, State> {
  static defaultProps = {
    children: [],
  }

  render() {
    return (
      <Provider>
        <Pages pages={this.props.children} />
      </Provider>
    )
  }
}

export default Router
