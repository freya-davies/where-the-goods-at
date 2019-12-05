import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { getKey } from '../apis/auth'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Map extends React.Component {
    
  constructor(props) {
      super(props)
      console.log(props)
      this.state = {
          pins: [
            //   { lat: -41.295910, lng: 174.773990 },
            //   { lat: -41.291000, lng: 174.781520 }
          ],
          key: false
      }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      setTimeout(this.popUp, 10000);
    }
    getKey(). then(() => {
      this.setState({ key : true })
    })
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
    console.log(e)
  }


  render() {
    return (
      <div>
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
        
        {this.state.key && 
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.GOOGLE_MAPS}>
          <GoogleMap
            id='Traffic-layer-example'
            mapContainerStyle={{
              height: "800px",
              width: "1200px"
            }}
            zoom={12}
            center={{
              lat: -41.2743523,
              lng: 174.735582
            }}
            mapTypeId='satellite'
            onClick={this.handleClick}
          >
           {/* {this.state.pins.map((pin) => {
             return (
                  <Marker
                      position={pin}
                  />
             ) 
           })} */}
           {
                this.props.items.items.map((item) => {
                    console.log(item)
                    var location = { 
                        lat: item.lat, 
                        lng: item.long 
                    }
                    return (
                        <Marker
                            position={ location }
                        />
                    )
                })
           }
          </GoogleMap>

        </LoadScript>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth, items }) => {
    return {
        auth,
        items
    }
}

export default connect(mapStateToProps)(Map)
