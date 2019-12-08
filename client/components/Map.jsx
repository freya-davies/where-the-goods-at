import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { getKey } from '../apis/auth'
import { connect } from 'react-redux'
import ItemList from './ItemList'
import AddModal from './AddModal'
import { showAddItemModal, updateItemModal } from '../actions/modals'
import { getCategories, getSeasons } from '../apis/items'


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
    getCategories()
      .then(categoryData => {
        this.setState({ categoryData })
      })
    getSeasons()
      .then(seasonData => {
        this.setState({ seasonData })
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
    console.log(this.state)
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
                  onClick={this.handleAddPin}>
                  {this.props.items.map((item, index) => {
                    return (
                      <Marker
                        onClick={() => this.openWindow(index)}
                        key={index}
                        position={{ lat: item.lat, lng: item.long }}
                        icon={'/images/Avocado.svg'}
                      >
                        {this.props.items[index] == this.state.activePin && (
                          <InfoWindow onCloseClick={() => this.closeWindow()} position={{ lat: item.lat, lng: item.long }}>
                            <div className="">
                              <h4>{this.props.items[index].item_name}</h4>
                              {/* <input type='text' name={this.props.items[index].item_name} />  */}
                              <h6>Description: {this.props.items[index].description}</h6>
                              <h6>Category: {this.state.categoryData[this.props.items[index].category_id - 1].category_name}</h6>
                              <h6>Quantity: {this.props.items[index].quantity}</h6>
                              <h6>Season: {this.state.seasonData[this.props.items[index].season_id - 1].season_name}</h6>
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