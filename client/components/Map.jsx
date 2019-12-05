import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'


class Map extends Component {

    constructor() {
        super()
        this.state = {
            firstPin: { lat: -41.295910, lng: 174.773990 }
        }
    }

    componentDidMount() {
        
    }


    handleClick = (e) => {
        console.log(e)
    }


    render() {
        return (
            <div>

                <LoadScript
                    id="script-loader"
                    googleMapsApiKey={process.env.GOOGLE_MAPS}

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
                        <Marker
                        position={this.state.firstPin}
                        />
                    </GoogleMap>

                </LoadScript>
            </div>
        )
    }
}

export default Map
