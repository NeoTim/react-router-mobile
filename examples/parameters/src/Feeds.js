import { navigate } from 'react-router-mobile'
import React from 'react'
import Nav from './Nav'

class Feeds extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <Nav />
        </div>
        <div className="body">{this.props.children}</div>
        <div className="footer">
          <button onClick={() => navigate('/login')}>login</button>
        </div>
      </div>
    )
  }
}

export default Feeds
