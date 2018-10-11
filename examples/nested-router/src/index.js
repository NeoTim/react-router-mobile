import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Router, Link, Header, Body, Footer } from 'react-router-mobile'

import 'react-router-mobile/dist/index.css'

import './index.scss'

const AppStore = ({ children }) => (
  <Fragment>
    <Header vh={10}>
      <h4>App Store</h4>
    </Header>
    <Body vh={80}>{children}</Body>
    <Footer className="flex-container" vh={10}>
      <Link className="flex-item" to="/store/today">
        Taday
      </Link>
      <Link className="flex-item" to="/store/game">
        Game
      </Link>
      <Link className="flex-item" to="/store/app">
        App
      </Link>
    </Footer>
  </Fragment>
)

const Today = () => (
  <div className="home">
    {Array(100)
      .fill('')
      .map((_, i) => `Today-${i}`)
      .map(i => (
        <div key={i}>{i}</div>
      ))}
  </div>
)

const Game = () => (
  <div className="about">
    {Array(100)
      .fill('')
      .map((_, i) => `Game-${i}`)
      .map(i => (
        <div key={i}>{i}</div>
      ))}
  </div>
)

const App = () => (
  <div className="contact">
    {Array(100)
      .fill('')
      .map((_, i) => `App-${i}`)
      .map(i => (
        <div key={i}>{i}</div>
      ))}
  </div>
)

const Example = () => (
  <Router>
    <Today path="/" animation="fade" />
    <AppStore path="/store" animation="fade">
      <Today path="/today" />
      <Game path="/game" />
      <App path="/app" />
    </AppStore>
  </Router>
)

ReactDOM.render(<Example />, document.getElementById('root'))
