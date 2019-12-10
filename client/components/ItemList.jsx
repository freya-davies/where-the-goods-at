import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import {deleteItem} from '../apis/items'


class ItemList extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        item: null
      }
    }

  //   componentDidMount() { }

  //   componentDidUpdate(newProps) {
  //     console.log(newProps)
  //     this.setState({
  //       items: newProps.items
  //     })
  //     return true
  //   }

  handleDelete = (id) => {
  
    deleteItem(id)
      .then(() => {
        this.refreshPage()
      })
    }

  refreshPage = () => {
    window.location.reload()
  }

  render() {
    return (
      <div className='scrollable'>
        <h2>Listed items: </h2>
        <div className="row">
          <div className="col-centered">
            {this.props.items.map((item, i) => {
              return (
                <div key={i} className="card" style={{ alignItems: 'center' }} >
                  <img className="card-img-top" src={item.image} alt={item.item_name} style={{ 'MaxWidth': 2 + 'rem' }} />
                  <div className="card-body">
                    <h5 className="card-title">{item.item_name}</h5>
                    <h6><em>{item.suburb}</em></h6>
                    <p className="card-text">{item.description}</p>
                    <Link to={`/update/${item.id}`}>
                      <button>Update</button>
                    </Link>
                    <button onClick={() => this.handleDelete(item.id)}>Delete</button>

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


export default ItemList
