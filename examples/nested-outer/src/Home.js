import React from 'react'

import { Link } from 'react-router-mobile'

class PageIndex extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Routers</h1>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/feeds/hot'}>Feeds(TODO)</Link>
          </li>
          <li>
            <Link to={'/posts'}>Posts</Link>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default PageIndex
