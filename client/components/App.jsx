import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Items from './Items'      
import Map from './Map'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <div className="container has-text-centered">
          <div className="hero is-small is-primary">
            <div className="hero-body has-text-centered">
              <Link to='/' className="">
                <h1 className="title is-1">Where The Goods At</h1>
              </Link>
              <Nav />
            </div>
          </div>
            <Route exact path="/" component={Map} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

        <div className=''>
          {!auth.isAuthenticated &&
            <Route exact path="/" component={Login} />
          }
          <Route path='/add' component={Items} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
