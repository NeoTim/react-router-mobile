import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

// import { Router } from '../../dist/index.es'
import { Router, Page, Header, Body, Footer, navigate } from '../../dist'
import Home from './Home'
import PostList from './PostList'
import PostDetail from './PostDetail'
import About from './About'
import Login from './Login'
import Feeds from './Feeds'
import Hot from './Hot'
import Latest from './Latest'
import Like from './Like'

import './index.less'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Home path="/home" animation="fade" default />
        <Feeds path="/feeds" animation="fade">
          <Hot path="hot" animation="fade" />
          <Latest path="latest" animation="fade" />
          <Like path="like" animation="fade" />
        </Feeds>
        <PostList path="/posts" animation="slide-right" />
        <PostDetail path="/posts/detail" animation="slide-right" />
        <About path="/about" animation="slide-right" />
        <Login path="/login" animation="slide-up" />
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

hot(module)(App)
