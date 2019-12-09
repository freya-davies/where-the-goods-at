import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/logout'

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { auth, logout } = this.props
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark customNavStyles">
        <Link to='/' ><img className="navbar-brand " style={{ width: 80 + 'px', height: 100 + "%" }} src="/images/forage-lettuce.png" alt="" /></Link>
        <Link to='/'><h1 className="title is-1">Foraged &amp; Found</h1></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto" style={{ 'paddingRight': 50 + 'px' }}>
            {auth.isAuthenticated
              ? [<li key="1" className="nav-item nav-username">Welcome {this.props.auth.user.user_name}!</li>,
              <li key="2" className="nav-item navListItems"><Link to='/' className="nav-link" onClick={() => logout()}>Logout</Link></li>,
              <li key="3" className="nav-item navListItems"><Link to='/add' className="nav-link">Add Item</Link></li>]
              : [
                <li key="4" className="nav-item navListItems" ><Link onClick={this.toggleBurger} className="nav-link" to='/login'>Login</Link></li>,
                <li key="5" className="nav-item navListItems" ><Link onClick={this.toggleBurger} className="nav-link" to='/register'>Register</Link></li>
              ]
            }
          </ul>
        </div>
      </nav>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)