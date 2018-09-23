import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

import { Router, Route } from '../../dist'

import Home from './Home'
import PostList from './PostList'
import PostDetail from './PostDetail'
import About from './About'
import Login from './Login'
import Feeds from './Feeds'
import Hot from './Hot'
import Latest from './Latest'
import Like from './Like'
import Nest from './Nest'

import './index.less'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Home path="/" animation="fade" />
        <PostList path="/posts" animation="slide-right" />
        <PostDetail path="/posts/:id" animation="slide-right" />
        <About path="/about" animation="slide-right" />
        <Login path="/login" animation="slide-up" />
        <Feeds path="/feeds" animation="slide-right">
          <Hot path="/hot" />
          <Like path="/like">
            <Nest path="/nest" />
          </Like>
          <Latest path="/latest" />
        </Feeds>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

hot(module)(App)
