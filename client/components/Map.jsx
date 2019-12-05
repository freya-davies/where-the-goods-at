import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'


class Map extends Component {


    handleClick = (e) => {
        console.log(e)
    }


    render() {
        return (
            <div>

                <LoadScript
                    id="script-loader"
                    googleMapsApiKey="AIzaSyDlCzvqC9Bvt0MZ2JLsKtFQQdmRL9FmRO0"
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
                    </GoogleMap>

                </LoadScript>
            </div>
        )
    }
}

export default Map
