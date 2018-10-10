import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Link, Back } from 'react-router-mobile'

import 'react-router-mobile/dist/index.css'

import './index.scss'


const Home = () => (
  <div className="home">
    <h1>Home</h1>
    <Link to="/about">About</Link>
    <br/>
    <Link to="/contact">Contact</Link>
  </div>
)

const About = () => (
  <div className="about">
    <h1>About</h1>
    <Back />
  </div>
)

const Contact = () => (
  <div className="contact">
    <h1>Contact</h1>
    <Back />
  </div>
)

const App = () => (
  <Router>
    <Home path="/" animation="fade" />
    <About path="/about" animation="slide-right" />
    <Contact path="/contact" animation="slide-right" />
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
