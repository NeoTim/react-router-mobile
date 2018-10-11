import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Link, Back } from 'react-router-mobile'

import 'react-router-mobile/dist/index.css'

import './index.scss'

const Home = () => (
  <div className="home">
    <br />
    <div>Url Params</div>
    <Link to="/users/Jordan">Jordan</Link>
    <br />
    <Link to="/users/James">James</Link>
  </div>
)

const User = ({ params }) => (
  <div className="user">
    <h1>Hey, I am {params.name}</h1>
    <Back />
  </div>
)

const App = () => (
  <Router>
    <Home path="/" animation="fade" />
    <User path="/users/:name" animation="slide-right" />
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
