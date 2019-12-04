import React from 'react'
import {connect} from 'react-redux'
import {loginUser, loginError} from '../actions/login'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(loginError(''))
  }
  updateDetails(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    let {user_name, password} = this.state
    this.props.dispatch(loginUser({user_name, password}))
  }
  render() {
    const { auth } = this.props
    return (
      <div className="loginContainer">
      <div className="col-6 col-md-4">
      <form onSubmit={this.submit}>
        <h1 className='loginTitle'>Login</h1>
   
        {auth.errorMessage && (
          <>
            <h1>
              <span className='badge badge-danger badge-lg'>
                {auth.errorMessage}
              </span>
            </h1>
            <br></br>
          </>
        )}
        <div className='form-inline'>
          <label htmlFor='user_name'>
            <input
              required
              className='form-control'
              placeholder='Username'
              type='text'
              name='user_name'
              onChange={this.updateDetails}
            />
          </label>
        </div>
        <br></br>
        <div className='form-inline'>
          <label htmlFor='password'>
            <input
              required
              className='form-control'
              placeholder='Password'
              type='password'
              name='password'
              onChange={this.updateDetails}
            />
          </label>
          <div className="loginButton">
        <input className='btn btn-primary' value='Login' type='submit' />
        </div>
        </div>
    
      </form>
      </div>
      </div>
    )
  }
}


const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Login)
