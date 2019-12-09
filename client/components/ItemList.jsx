import React from 'react'
import { connect } from 'react-redux'
import { findSuburb } from '../apis/itemList'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  componentWillReceiveProps(newProps) {
    this.setState({
      items: newProps
    })
  }

  handleClick = e => { }

  getSuburbs = item => {
    return findSuburb(item.lat, item.long).then(data => {
      return data
    })
    // console.log(findSuburb(item.lat, item.long))
  }
  // findSuburb(this.props.items.items.lat, this.props.items.items.long)

  render() {
    const items = this.props.items
    // console.log(this.props.items.items)

    // --------------------------
    // WANT TO ADD IN LOCATION/SUBURB, need to change lat and long into street adderess
    // --------------------------

    return (
      <div className='scrollable'>
        <h2>Listed items: </h2>
        <div className="row">
          <div className="col-centered">
          {items.map((item, i) => {
            return (
              <div className="card" style={{ alignItems: 'center'}} >
                <img className="card-img-top" src={item.image} alt={item.item_name} style={{ 'MaxWidth': 2 + 'rem'}}/>
                <div className="card-body">
                  <h5 className="card-title">{item.item_name}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            )
          }
          )}
        </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(ItemList)
