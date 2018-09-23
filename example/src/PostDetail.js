import React from 'react'

import { Back } from '../../dist'

class PostsDetail extends React.Component {
  render() {
    console.log('detail props:', this.props)
    return (
        <div className="post-detail">
          <h1>Posts Detail</h1>
          <Back />
        </div>
    )
  }
}

export default PostsDetail
