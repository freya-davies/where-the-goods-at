import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { getKey } from '../apis/auth'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Map extends React.Component {
    
  constructor() {
      super()
      this.state = {
          pins: [
              { lat: -41.295910, lng: 174.773990 },
              { lat: -41.291000, lng: 174.781520 }
          ],
          key: false
      }
  }

    constructor() {
        super()
        this.state = {
            pins: [
                { lat: -41.295910, lng: 174.773990 },
                { lat: -41.291000, lng: 174.781520 }
            ],
            key: false
        }
    }

    componentDidMount() {
        getKey().then(() => {
            this.setState({ key: true })
        })
    }

    handleClick = (e) => {
        // console.log(e)
    }


    render() {
        return (
            <div>
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
                            {this.state.pins.map((pin) => {
                                return (
                                    <Marker
                                        position={pin}
                                    />
                                )
                            })}
                        </GoogleMap>

                    </LoadScript>
                }
            </div>
 
    )
  }

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Map)