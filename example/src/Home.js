import React from 'react'

import Nav from './Nav'
import { Link } from '../../dist'

class PageIndex extends React.Component {
  render() {
    return (
      <div className="home">
        <Nav />
        <h1>home</h1>
        <Link />
      </div>
    )
  }
}

export default PageIndex
