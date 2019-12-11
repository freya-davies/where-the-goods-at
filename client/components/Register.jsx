import React from 'react'
import { connect } from 'react-redux'
import { registerUserRequest } from '../actions/register'
import { checkDatabase } from '../apis/register'
import { loginError } from '../actions/login'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(loginError(''))
  }

  updateDetails(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit(e) {
    e.preventDefault()
    e.target.reset()
    let { user_name, password, confirm_password, email, first_name, last_name } = this.state

    checkDatabase(email)
      .then((emailExists) => {
        if (emailExists) return this.props.dispatch(loginError("Email already exists"))
        if (password.length <= 7) return this.props.dispatch(loginError("Password must contain at least 8 characters"))
        if (confirm_password != password) return this.props.dispatch(loginError("Passwords don't match"))
        this.props.dispatch(registerUserRequest(this.state))
      })
  }


  render() {
    const { auth } = this.props
    return (
      <div className="registerContainer">
        <div className="col-6 col-md-4 register-div">
          <Link to='/' ><img className="img-fluid" src="/images/forage-cabbage.png" alt="Forage &amp; Find" /></Link>

          <form className="login-register-form" onSubmit={this.submit}>
            <h1 className='registerTitle'>Register</h1>
            {auth.errorMessage && <><h1><span className="badge badge-danger badge-lg">{auth.errorMessage}</span></h1><br></br></>}

            <div className="row justify-content-start">
              <div className='col-6 reg-text'>
                <label htmlFor="user_name" 
                  >Username:
              </label>
              </div>

              <div className='col-6 reg'>
                <input required className="form-control update" placeholder="Username" type="text" name="user_name" onChange={this.updateDetails} />
              </div>
            </div>

            <div className="row justify-content-start">
              <div className='col-6 reg-text'>
                <label htmlFor="email" 
                  >Email:
              </label>
              </div>

              <div className='col-6 reg'>
                <input required className="form-control update" placeholder="Email" type="email" name="email" onChange={this.updateDetails} />
              </div>
            </div>

            <div className="row justify-content-start">
              <div className='col-6 reg-text'>
                <label htmlFor="first_name">
                  First Name:
                </label>
              </div>

              <div className='col-6 reg'>
                <input required className="form-control update" placeholder="First Name" type="text" name="first_name" onChange={this.updateDetails} />
              </div>
            </div>

            <div className="row justify-content-start">
              <div className='col-6 reg-text'>
                <label htmlFor="lastName">
                  Last Name:
                </label>
              </div>

              <div className='col-6 reg'>
                <input required className="form-control update" placeholder="Last Name" type="text" name="last_name" onChange={this.updateDetails} />
              </div>
            </div>

            <div className="row justify-content-start">
              <div className='col-6 reg-text'>
                <label htmlFor="password">
                  Password:
                </label>
              </div>

              <div className='col-6 reg'>
                <input required className="form-control update" placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
              </div>
            </div>

            <div className="row justify-content-start">
              <div className='col-6 reg-text'>
                <label htmlFor="confirm_password">
                  Confirm Password:
                </label>
              </div>

              <div className='col-6 reg'>
                <input required className="form-control update" placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails} />
              </div>
            </div>

            <div className="registerButton">
              <input className="btn bg-main-reverse" value="Register" type="submit" />
            </div>
          </form>
        </div>
      </div >
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Register)
