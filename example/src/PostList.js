import React from 'react'
import { Back, navigate } from 'react-router-mobile'

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
        <Back to="back" />
        <h1>Posts</h1>
        <ul>
          {list.map((item, index) => (
            <li key={index} onClick={() => navigate(`/posts/${index}`)}>
              {item}
            </li>
          ))}
        </ul>

        <button onClick={() => navigate('/login')}>login</button>
      </div>
    )
  }
}

export default Posts
