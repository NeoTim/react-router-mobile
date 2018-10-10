import React from 'react'
import { Back } from 'react-router-mobile'

class PostsDetail extends React.Component {
  render() {
    return (
      <div className="like">
        <h1>like</h1>
        <Back />
        <div className="body">{this.props.children}</div>
      </div>
    )
  }
}

export default PostsDetail
