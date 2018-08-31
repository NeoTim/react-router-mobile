import React from 'react'
// import { route } from '../../dist/index.es'
import { navigate } from '../../dist/index'

import './nav.less'

class Nav extends React.Component {
  go(path) {
    return () => navigate(path)
  }

  render() {
    const { go } = this
    return (
      <div className="cmp-nav">
        <ul>
          <li onClick={go('/')}>Home</li>
          <li onClick={go('/posts')}>Post</li>
          <li onClick={go('/about')}>About</li>
        </ul>
      </div>
    )
  }
}

export default Nav
