import { navigate } from '../../dist'
import React from 'react'
import Nav from './Nav'

export default props => (
  <div>
    <div className="header">
      <Nav />
    </div>
    <div className="body">{props.children}</div>
    <div className="footer">
      <buttun onClick={() => navigate('/login')}>login</buttun>
    </div>
  </div>
)
