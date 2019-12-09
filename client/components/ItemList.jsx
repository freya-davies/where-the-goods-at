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
    // console.log(newProps)
    this.setState({
      items: newProps
    })
  }

  handleClick = e => { }

  render() {
    const items = this.props.items
    console.log(items)

    return (
      <div className='scrollable'>
        <h2>Listed items: </h2>
        <div className="row">
          {items.map((item, i) => {
            return (
              <div key={i} className="col-sm-4 container bg-dark-main">
                <div className="rounded">
                  <hr></hr>
                  <img className="rounded" src={item.img_url} alt={item.item_name} height="80" width="80" />
                  <h3>{item.item_name}</h3>
                  <h6><em>{item.suburb}</em></h6>
                  <p>{item.description}</p>
                  <hr></hr>
                </div>
              </div>

            )
          }
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(ItemList)
