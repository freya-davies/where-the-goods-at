import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'


class Map extends Component {
  render() {
      console.log('hello?')
     return (
     <div>
        
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDlCzvqC9Bvt0MZ2JLsKtFQQdmRL9FmRO0"
        
        
      >
        <GoogleMap
          id='example-map'
          mapContainerStyle={{
            height: "400px",
            width: "800px"
          }}
          zoom={7}
          center={{
            lat: -3.745,
            lng: -38.523
          }}
        />
          
      
      </LoadScript>
      </div>
     )
  }
}

export default Map
