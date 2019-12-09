import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { getKey } from '../apis/auth'
import { connect } from 'react-redux'
import AddModal from './AddModal'
import AddItemByAddress from './AddItemByAddress'
import { showAddItemModal, updateItemModal } from '../actions/modals'
import { getCategories, getSeasons } from '../apis/items'

const googleMapStyles = require('../../public/GoogleMapStyles.json')


class Map extends Component {

  constructor(props) {

    super(props)
    this.state = {
      center: {
        lat: -41.2743523,
        lng: 174.735582
      },
      pins: [],
      key: false,
      addMode: false,
      addForm: false,
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

  //try remaking these into DidUpdate as this method is considered unsafe and will be renamed in 17.x v of react
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
  toggleAddForm = (e) => {
    this.setState({
      addForm: !this.state.addForm
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
    return (

      <div className="mapWrap">
        {this.state.showPopUp &&
          <AddModal />
        }
        {this.state.addForm &&
          <AddItemByAddress toggleAddForm={this.toggleAddForm} />
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
                    width: "1200px",
                  }}
                  options={{
                    styles: googleMapStyles
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
                            <div className="info-window">
                              <h4>{this.props.items[index].item_name}</h4>
                              {/* <input type='text' name={this.props.items[index].item_name} />  */}
                              <h6>Description:</h6><p> <em>"{this.props.items[index].description}"</em></p>
                              <h6>Category:</h6><p> {this.state.categoryData[this.props.items[index].category_id - 1].category_name}</p> 
                              <h6>Quantity:</h6><p>{this.props.items[index].quantity}</p>
                              <h6>Season:</h6><p> {this.state.seasonData[this.props.items[index].season_id - 1].season_name}</p> 
                              {this.props.items[index].image &&
                                <img src={this.props.items[index].image} style={{maxWidth: '20rem'}}/>}
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    )
                  })}
                </GoogleMap>
              </LoadScript>
            }
   
        {this.props.auth.auth.isAuthenticated &&
            <div className="addItemContainer">
              <div className="addPinButton">
                <button onClick={this.toggleAddMode}>{this.state.addMode ? "Stop Adding Items" : "Add Item by Pin"}</button>
              </div>
              <div className="addPinButton">
                <button onClick={this.toggleAddForm}>Add Item by Address</button>
              </div>
            </div>
                }

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (auth) => {
  return {
    auth
  }
}



export default connect(mapStateToProps, { showAddItemModal, updateItemModal })(Map)