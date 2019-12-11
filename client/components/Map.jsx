import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { getKey } from '../apis/auth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AddModal from './AddModal'
import AddItemByAddress from './AddItemByAddress'
import { showAddItemModal, updateItemModal } from '../actions/modals'
import { getCategories, getSeasons } from '../apis/items'

const googleMapStyles = require('../../public/GoogleMapStyles.json')


export class Map extends Component {

  constructor(props) {

    super(props)
    this.state = {
      center: {
        lat: -41.2743523,
        lng: 174.735582
      },
      zoom: 12,
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


      //refactor idea
        //if(this.props.currentItem != newProps.currentItem) {
      //this.centerFocusOn(newProps.currentItem)

    if (this.props.currentItem != newProps.currentItem) {
      this.setState({
        center: {
          lat: newProps.currentItem.lat,
          lng: newProps.currentItem.long
        },
        zoom: 18
      })
    }
  }

  //centerFocusOn = (currentItem) => {
   // this.setState({
   //   center: {
   //     lat: currentItem.lat,
   //     lng: currentItem.long
  //    },
  //    zoom: 18
  //  })
  //}

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

  handleIcons = category => {
    return '/images/Avocado.svg'
    //need to read from file and do a string.includes on each
  }

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
                libraries={["places"]}
                googleMapsApiKey={process.env.GOOGLE_MAPS}>
                  
                <GoogleMap
                  id='Traffic-layer-example' mapTypeId='satellite'
                  mapContainerStyle={{ height: "800px", width: "1200px", borderRadius: ".25rem", boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 4px -1px" }}
                  options={{ styles: googleMapStyles }}
                  zoom={this.state.zoom}
                  center={this.state.center}
                  onClick={this.handleAddPin}>

                  {this.props.items.map((item, index) => {
                    return (
                      <Marker
                        onClick={() => this.openWindow(index)}
                        key={index}
                        position={{ lat: item.lat, lng: item.long }}
                        //icon={this.handleIcons(item.category_id)}
                        icon={`/images/icon${item.category_id}.svg`}                      
                      >
                        {this.props.items[index] == this.state.activePin && (
                          <InfoWindow 
                            onCloseClick={() => this.closeWindow()} 
                            position={{ lat: item.lat, lng: item.long }}
                            options={{pixelOffset: new google.maps.Size(0, -40)}}
                            >
                            <div className="info-window">
                              <h4>{this.props.items[index].item_name}</h4>
                              {/* <input type='text' name={this.props.items[index].item_name} />  */}
                              <h6>Description:</h6><p> <em>"{this.props.items[index].description}"</em></p>
                              <h6>Category:</h6><p> {this.state.categoryData[this.props.items[index].category_id - 1].category_name}</p>
                              <h6>Quantity:</h6><p>{this.props.items[index].quantity}</p>
                              <h6>Season:</h6><p> {this.state.seasonData[this.props.items[index].season_id - 1].season_name}</p>
                              {this.props.items[index].image &&
                                <img src={this.props.items[index].image} style={{ maxWidth: '20rem' }} />}
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    )
                  })}

                  {this.props.auth.auth.isAuthenticated &&
                              <div className="addItemContainer">
                                <div className="addPinButton">
                                  <button type="button" className="btn btn-light" onClick={this.toggleAddMode} style={{ backgroundColor: this.state.addMode ? "#D25E5D" : "#f8f9fa"}}>{this.state.addMode ? "Stop Adding Items" : "Add Item by Pin"}</button>
                                </div>
                                <div className="addPinButton">
                                  <button type="button" className="btn btn-light" onClick={this.toggleAddForm}>Add Item by Address</button>
                                </div>
                              </div>
                    :
                    <div className="addItemContainer">
                      <div className="addPinButton">
                        <Link to='/login'>
                          <button type="button" className="btn btn-light">Add Item by Pin</button>
                        </Link>
                      </div>
                      <div className="addPinButton">
                        <Link to='/login'>
                          <button type="button" className="btn btn-light">Add Item by Address</button>
                        </Link>
                      </div>
                    </div>
                  }

                </GoogleMap>
              </LoadScript>
            }

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state,
    currentItem: state.currentItem,
  }
}



export default connect(mapStateToProps, { showAddItemModal, updateItemModal })(Map)
