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
          center : {
            lat: -41.2743523,
            lng: 174.735582
          },
          pins: [],
        //   pins: [
        //       { lat: -41.295910, lng: 174.773990 },
        //       { lat: -41.291000, lng: 174.781520 }
        //   ],
        key: false
      }
  }

  componentDidMount() {
    getKey().then(() => {
      this.setState({ key : true })
    })

    this.setState({
        pins: this.props.items.items.map((item) => {
            var location = { 
                lat: item.lat, 
                lng: item.long 
            }
            return location
        })
    })
  }

   
  handleClick = (e) => {
    this.setState({
         pins: [...this.state.pins,
         { lat: e.latLng.lat(), lng: e.latLng.lng() }],
         center: { lat: e.latLng.lat(), lng: e.latLng.lng()}

    })
    }


    render() {
        return (
            <div>
        {this.state.key && this.props.items.items &&
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
            onClick={this.handleClick}
          >
           {this.state.pins.map((pin) => {
             return (
                  <Marker
                      position={pin}
                  />
             ) 
           })}
           {/* {
                this.props.items.items.map((item) => {
                    console.log(item)
                    var location = { 
                        lat: item.lat, 
                        lng: item.long 
                    }
                    console.log(location)
                    return (
                        <Marker
                            position={ location }
                        />
                    )
                })
           } */}
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