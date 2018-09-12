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
        <h1>home</h1>
        <ol>
          <li onClick={go('/')}>Home</li>
          <li onClick={go('/feeds/hot')}>Feeds</li>
          <li onClick={go('/posts')}>Posts</li>
          <li onClick={go('/posts/detail')}>Post detail</li>
          <li onClick={go('/about')}>About</li>
        </ol>
      </div>
    )
  }
}

export default PageIndex
