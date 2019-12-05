import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { getKey } from '../apis/auth'

class Map extends Component {

  constructor() {
    super()
    this.state = {
      firstPin: { lat: -41.295910, lng: 174.773990 },
      key: false
    }
  }

  componentDidMount() {
    getKey(). then(() => {
      this.setState({ key : true })
    })
  }


  handleClick = (e) => {
    console.log(e)
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
            <Marker
              position={this.state.firstPin}
            />
          </GoogleMap>

        </LoadScript>
        }
      </div>
    )
  }
}

export default Map
