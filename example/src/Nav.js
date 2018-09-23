import React from 'react'
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
          <li onClick={go('/feeds/hot')}>Hot</li>
          <li onClick={go('/feeds/like/nest')}>Like</li>
          <li onClick={go('/feeds/latest')}>Latest</li>
        </ul>
      </div>
    )
  }
}

export default Nav
