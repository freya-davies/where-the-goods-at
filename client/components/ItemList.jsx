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
    // console.log(this.props.items.items)

    // --------------------------
    // WANT TO ADD IN LOCATION/SUBURB, need to change lat and long into street adderess
    // --------------------------

    return (
      <div>
        <h2>Listed items: </h2>

        {items.map((item, i) => {
          return (
            <div key={i}>
              <hr></hr>
              <img src={item.img_url} alt={item.item_name} height="80" width="80" />
              <h3>{item.item_name}</h3>
              <p>{item.description}</p>
              <hr></hr>
            </div>
          )
        })}
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