import React from 'react'
import { Link } from 'react-router-mobile'

import './nav.scss'

class Nav extends React.Component {
  render() {
    return (
      <div className="cmp-nav">
        <ul>
          <Link to={'/feeds/hot'}>Hot</Link>
          <Link to={'/feeds/like/nest'}>Like</Link>
          <Link to={'/feeds/latest'}>Latest</Link>
        </ul>
      </div>
    )
  }
}

export default Nav
