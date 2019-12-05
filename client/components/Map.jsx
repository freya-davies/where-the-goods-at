import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Map extends React.Component {

    constructor() {
        super()
        this.state = {
            pins: [
                { lat: -41.295910, lng: 174.773990 },
                { lat: -41.291000, lng: 174.781520 }
            ]
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            setTimeout(this.popUp, 10000);
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
        console.log(e)
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

                <LoadScript
                    id="script-loader"
                    googleMapsApiKey="AIzaSyDlCzvqC9Bvt0MZ2JLsKtFQQdmRL9FmRO0"

                //paste the 2 lines below into the .env file and then REMOVE THEM FROM THIS FILE. Or we will all die.
                //JWT_SECRET="I Hate the Turtles! - Krang"
                // GOOGLE_MAPS=AIzaSyDlCzvqC9Bvt0MZ2JLsKtFQQdmRL9FmRO0
                >
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
                     {this.state.pins.map((pin) => {
                       return (
                            <Marker
                                position={pin}
                            />
                       ) 
                     })}
                       


                    </GoogleMap>

                </LoadScript>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Map)
