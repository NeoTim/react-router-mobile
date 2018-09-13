import React from 'react'

import { navigate } from '../../dist/index'
import { Back } from '../../dist'

const list = [
  'Let s say you havea',
  'house-class.',
  'This house has a basement,',
  'windows, a roof',
  '...',
]

class Posts extends React.Component {
  render() {
    return (
      <div className="posts">
        <Back />
        <h1>Posts</h1>
        <ul>
          {list.map((item, index) => (
            <li key={index} onClick={() => navigate(`/posts/${index}`)}>
              {item}
            </li>
          ))}
        </ul>

        <buttun onClick={() => navigate('/login')}>login</buttun>
      </div>
    )
  }
}

export default Posts
