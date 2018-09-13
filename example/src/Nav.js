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
          <li onClick={go('/feeds')}>Home</li>
          <li onClick={go('/feeds/hot')}>Hot</li>
          <li onClick={go('/feeds/latest')}>New</li>
          <li onClick={go('/feeds/like')}>Like</li>
        </ul>
      </div>
    )
  }
}

export default Nav
