import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { getKey } from '../apis/auth'
import { connect } from 'react-redux'
import ItemList from './ItemList'
import AddModal from './AddModal'
import { showAddItemModal, updateItemModal } from '../actions/modals'


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
      infoWindowShowing: false,
      activePin: null
    }

    this.openWindow = this.openWindow.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
  }

  componentDidMount() {
    getKey().then(() => {
      this.setState({ key: true })
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

  openWindow(index) {
    this.setState({
      activePin: this.props.items[index]
    })

    console.log(this.props.items[index])
  }

  closeWindow() {
    this.setState({
      activePin: null
    })
  }

  // this.setState({

  //     pins: [
  //         ...this.state.pins,
  //         { lat: e.latLng.lat(), lng: e.latLng.lng() }
  //     ],
  //     center: { lat: e.latLng.lat(), lng: e.latLng.lng()}

  // })

  render() {
    return (

      <div className="">
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
                        onClick={() => this.openWindow(index)}
                        key={index}
                        position={{ lat: item.lat, lng: item.long }}
                      >
                        {this.props.items[index] == this.state.activePin && (
                          <InfoWindow onCloseClick={() => this.closeWindow()} position={{ lat: item.lat, lng: item.long }}>
                            <div className="">
                              {this.props.items[index].item_name}
                              <br></br>
                              {this.props.items[index].description}
                              <br></br>
                              {this.props.items[index].img_url}
                              <br></br>
                              {this.props.items[index].category_id}
                              <br></br>
                              {this.props.items[index].public}
                              <br></br>
                              {this.props.items[index].quantity}
                              <br></br>
                              {this.props.items[index].season}
                              <br></br>
                              {this.props.items[index].image &&
                              <img src={this.props.items[index].image}/>}
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

export default connect(mapStateToProps, { showAddItemModal, updateItemModal })(Map)