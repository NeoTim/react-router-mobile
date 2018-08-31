import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

// import { Router } from '../../dist/index.es'
import { Router, route } from '../../dist'
import Home from './Home'
import PostList from './PostList'
import PostDetail from './PostDetail'
import About from './About'
import Login from './Login'

import './index.less'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Home path="/" default animation="fade" />
        <PostList path="/posts" animation="slide-right" />
        <PostDetail path="/posts/detail" animation="slide-right" />
        <About path="/about" />
        <Login path="/login" animation="slide-up" />
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

hot(module)(App)
