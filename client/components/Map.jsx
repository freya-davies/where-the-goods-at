import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { getKey } from '../apis/auth'
import { connect } from 'react-redux'
import ItemList from './ItemList'
import AddModal from './AddModal'

import { showAddItemModal } from '../actions/modals'

class Map extends Component {

  constructor(props) {

    super(props)
    console.log(props)
    this.state = {
      center: {
        lat: -41.2743523,
        lng: 174.735582
      },
      pins: [],
      key: false,
      addMode: false,
      showModal: false,
      infoWindowShowing: false
    }

    this.handleMarker = this.handleMarker.bind(this)

  }

  componentDidMount() {
    getKey().then(() => {
      this.setState({ key: true })
    })

    this.setState({
      pins: this.props.items.map((item, index) => {
        return {
          index,
          showing: false
        }
      })
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      pins: newProps.items.map((item) => {
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
      let newPin = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.props.showAddItemModal(newPin)
    }
  }

  handleMarker(index) {
    this.setState({
      pins: [...this.state.pins,
              this.state.pins[index].showing = !this.state.pins[index].showing
            ]
    })
  }

  // clearShowingPins = () => {
  //   return this.state.pins.map((pin) => {
  //       if (pin.showing == true) {
  //         pin.showing = false
  //       }
  //       return pin
  //     }) 
  // }

  // this.setState({

  //     pins: [
  //         ...this.state.pins,
  //         { lat: e.latLng.lat(), lng: e.latLng.lng() }
  //     ],
  //     center: { lat: e.latLng.lat(), lng: e.latLng.lng()}

  // })

  render() {
    return (

      <div className="fixMap">
        {this.state.showPopUp &&
          <AddModal />
        }

        <div className="container px-lg-5">
          <div className="row mx-lg-n5">
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
                  {this.props.items.map((item, index) => {
                    return (
                      <Marker
                        onClick={() => this.handleMarker(index)}
                        key={index}
                        position={{ lat: item.lat, lng: item.long }}
                      >
                        {this.state.pins[index].showing && (
                          <InfoWindow onCloseClick={() => this.handleMarker(index)} position={{ lat: item.lat, lng: item.long }}>
                            <div className="">
                              myinfowindow
                              </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    )
                  })}
                </GoogleMap>
              </LoadScript>
            }
            <button onClick={this.toggleAddMode}>{this.state.addMode ? "Stop Adding Items" : "Add Items"}</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, { showAddItemModal })(Map)