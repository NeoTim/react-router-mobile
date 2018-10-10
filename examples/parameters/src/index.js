import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router-mobile'

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

import './index.scss'

import "react-router-mobile/dist/index.css";
// import "react-router-mobile/src/styles/index.scss";

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
