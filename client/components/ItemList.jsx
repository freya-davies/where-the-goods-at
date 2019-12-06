import React from 'react'
import { connect } from 'react-redux'
import { findSuburb } from '../apis/itemList'


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

  getSuburbs = (item) => {
    // console.log(this.props.items.items)
    return findSuburb(item.lat, item.long)
      .then((data) => {
        console.log(data)
        return data
      })
    // console.log(findSuburb(item.lat, item.long))
  }
  // findSuburb(this.props.items.items.lat, this.props.items.items.long)


  render() {
    const items = this.props.items.items
    // console.log(this.props.items.items)

    // --------------------------
    // WANT TO ADD IN LOCATION/SUBURB, need to change lat and long into street adderess
    // --------------------------

    return (
      <div>
        <h2>Listed items: </h2>
        {this.props.items.items ?
          <>
            {items.map((item, i) => {
              return (
                <div key={i}>
                  <hr></hr>
                  <img src={item.img_url} alt={item.item_name} height="80" width="80" />
                  <h3>{item.item_name}</h3>
                  <p>{item.description}</p>
                  {/* <p>{findSuburb(item.lat, item.long)}</p> */}
                  <p>{this.getSuburbs(item)}</p>
                  <hr></hr>
                </div>
              )
            }
            )}
            
            </>
          :
          <p>Fetching Data</p>
          }
        
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