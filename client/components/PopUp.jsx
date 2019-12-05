import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class PopUp extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

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


  handleClick = (e) => {
    // console.log(e)
  }


  render() {
    return (
      <React.Fragment>
        {/* pop-up-sign-in-modal */}
        {this.state.showPopUp &&
          <div className="modal" style={{ display: 'block' }} id="myModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(PopUp)
