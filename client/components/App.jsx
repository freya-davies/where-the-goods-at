import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Map from './Map'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopUp: false
    }

  }

  // -----------------------------------
  // pop up info to be moved onto home page
  // -----------------------------------
  
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      setTimeout(this.popUp, 1000);
    }
  }

  popUp = () => {
    this.setState({ showPopUp: true })
    // console.log(document.getElementById('myModal').style)
    // document.getElementById('myModal').style.display = 'block'
    // console.log('hello')
  }

  closeModal = () => {
    this.setState({
      showPopUp: false
    })
  }

  render() {
    return (
      <Router>
        {this.state.showPopUp &&
            <div className="modal" style={{display: 'block'}} id="myModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Become A Forage Extraordinaire!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Get access to more options and goodies!
                    </div>
                  <div className="modal-footer">
                    <Link className="btn btn-primary" to="/login">Login</Link>
                    <Link className="btn btn-primary" to="/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>
        }

        <div className="container has-text-centered">

          <div className="hero is-small is-primary">
            <div className="hero-body has-text-centered">
              <Link to='/' className="">
                <h1 className="title is-1">Where The Goods At</h1>
              </Link>
              <Nav />
              <Map />
            </div>
          </div>

          <div className=''>
            {!this.props.auth.isAuthenticated &&
              <Route exact path="/" component={Login} />
            }
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>

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
