import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { getKey } from '../apis/auth'

class Map extends React.Component {
    
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            center : {
                lat: -41.2743523,
                lng: 174.735582
            },
            pins: [],
            key: false,
            addMode: false
        }
    } 

    componentDidMount() {
        getKey().then(() => {
            this.setState({ key : true })
        })

        this.setState({
            pins: this.props.items.map((item) => {
                var location = { 
                    lat: item.lat, 
                    lng: item.long 
                }
                return location
            })
        })
    }

    toggleAddMode = (e) => {
        this.setState({
            addMode: !this.state.addMode
        })
    }

   
    handleAddPin = (e) => {
        if (this.state.addMode) {
            this.setState({
                pins: [
                    ...this.state.pins,
                    { lat: e.latLng.lat(), lng: e.latLng.lng() }
                ],
                center: { lat: e.latLng.lat(), lng: e.latLng.lng()}

            })
        }
    }


    render() {
        return (
          <div className="container px-lg-5">
            <div class="row mx-lg-n5">
                {this.state.key && this.props.items &&
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
                        center={this.state.center}
                        mapTypeId='satellite'
                        onClick={this.handleAddPin}
                    >
                    {this.state.pins.map((pin, index) => {
                        return (
                            <Marker
                                key={index}
                                position={pin}
                            />
                        ) 
                    })}
                    </GoogleMap>
                </LoadScript>
                }
                <button onClick={this.toggleAddMode}>{ this.state.addMode ? "Stop Adding Pins" : "Add Pins"}</button>
                </div>
            </div>
    )
  }
}



export default Map