import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { findSuburb } from '../apis/itemList'
import { setCurrentItem } from '../actions/items'

class ItemList extends React.Component {
  // --------------------
  //  connecting redux make this break for some reason, please leave comments
  // --------------------
  //   constructor(props) {
  //     super(props)
  //     this.state = {}
  //   }

  //   componentDidMount() { }

  //   componentDidUpdate(newProps) {
  //     console.log(newProps)
  //     this.setState({
  //       items: newProps.items
  //     })
  //     return true
  //   }

  //   handleClick = e => { }

  render() {
    return (
      <div className='scrollable rounded bg-main'>
        <h2>Listed items: </h2>
        <div className="row">
          <div className="col-centered">
            {this.props.items.map((item, i) => {
              return (
                <div key={i} className="card" style={{ alignItems: 'center' }} >
                  <div onClick={() => this.props.dispatch(setCurrentItem(item))}>
                    <img className="card-img-top" src={item.image} alt={item.item_name} style={{ 'MaxWidth': 2 + 'rem' }} />

                    <div className="card-body">
                      <h5 className="card-title">{item.item_name}</h5>

                      <h6><em>{item.suburb}</em></h6>

                      <p
                        className="card-text">{item.description}
                      </p>
                    </div>
                  </div>

                  <Link to={`/update/${item.id}`}>
                    <button>Update</button>
                  </Link>
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


// export default connect()(ItemList)
export default ItemList
