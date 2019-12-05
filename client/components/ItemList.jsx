import React from 'react'
import { connect } from 'react-redux'


class ItemList extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
      }
  }

  componentDidMount() {

  }

   
    handleClick = (e) => {
    }


    render() {
      const items = this.props.items.items
      console.log(this.props.items.items)
        return (
            <div>
              <h2>Listed items: </h2>

              {items.map((item, i) => {
                return (
                  <div key ={i}>
                    <hr></hr>
                    <img src={item.img_url} alt={item.item_name} height="80" width="80"/> 
                    <h3>{item.item_name}</h3>
                    <p>{item.description}</p>
                    <hr></hr>
                  </div>
                )
              })}


        {/* {this.state.key && this.props.items.items &&
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
            center={{
              lat: -41.2743523,
              lng: 174.735582
            }}
            mapTypeId='satellite'
            onClick={this.handleClick}
          >
           {this.state.pins.map((pin) => {
             return (
                  <Marker
                      position={pin}
                  />
             ) 
           })} */}
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
          {/* </GoogleMap>

        </LoadScript>
        } */}
      </div>
    )
  }
}

const mapStateToProps = ({ items }) => {
    return {
        items
    }
}

export default connect(mapStateToProps)(ItemList)