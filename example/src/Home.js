import React from 'react'

import { navigate } from '../../dist/index'

class PageIndex extends React.Component {

  go(path) {
    return () => navigate(path)
  }
  render() {
    const { go } = this
    return (
      <div className="home">
        <h1>Routers</h1>
        <ul>
          <li onClick={go('/')}>Home</li>
          <li onClick={go('/feeds')}>Feeds(TODO)</li>
          <li onClick={go('/posts')}>Posts</li>
          <li onClick={go('/about')}>About</li>
        </ul>
      </div>
    )
  }
}

export default PageIndex
