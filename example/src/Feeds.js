import { navigate } from '../../dist'
import React from 'react'
import Nav from './Nav'
// import { Page } from '../../dist/index'

class Feeds extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <Nav />
        </div>
        <div className="body">{this.props.children}</div>
        <div className="footer">
          <buttun onClick={() => navigate('/login')}>login</buttun>
        </div>
      </div>
    )
  }
}

export default Feeds
