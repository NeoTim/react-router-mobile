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

import './index.less'

const routes = [
  {
    path: '/',
    component: Home,
    animation: 'fade',
  },
  {
    path: '/posts',
    component: PostList,
    animation: 'slide-right',
  },
  {
    path: '/posts/:id',
    component: PostDetail,
    animation: 'slide-right',
  },
  {
    path: '/about',
    component: About,
    animation: 'slide-right',
  },
  {
    path: '/login',
    component: Login,
    animation: 'slide-up',
  },
  {
    path: '/feeds',
    component: Feeds,
    animation: 'slide-right',
    routes: [
      {
        path: '/hot',
        component: Hot,
        animation: 'fade',
      },
      {
        path: '/latest',
        component: Latest,
        animation: 'fade',
      },
      {
        path: '/like',
        component: Like,
        animation: 'fade',
      },
    ],
  },
]

class App extends React.Component {
  render() {
    return <Router routes={routes} />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

hot(module)(App)
