import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { deleteItem } from '../apis/items'
import { setCurrentItem } from '../actions/items'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null
    }
  }

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
        <div className='container rounded bg-main mb-3'>
          <h3 className="list-heading">Listed Items</h3>
          <div className="row">
            <div className="col-centered">

              {this.props.items.map((item, i) => {
                return (
                  <div key={i} className="card list-card text-left" style={{ alignItems: 'left' }} >
                    <div className="ListItemItems text-left" onClick={() => this.props.dispatch(setCurrentItem(item))}>
                      <div className="itemListImgDiv">
                        <img className="card-img-top" src={item.image} alt={item.item_name} style={{ 'MaxWidth': 2 + 'rem' }} />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.item_name}</h5>
                        <h6><em>{item.suburb}</em></h6>
                        <p className="card-text">{item.description}</p>


                        {this.props.auth &&
                          <>
                            <Link to={`/update/${item.id}`}>
                              <button className="btn bg-main-reverse spacer">Update</button>
                            </Link>
                            <button className="btn bg-main-reverse spacer" onClick={() => window.confirm("Are you sure you wish to delete this item?") && this.handleDelete(item.id)}>Delete</button>
                          </>
                        }
                      </div>
                    </div>
                  </div>
                )
              }
              )}
            </div>

          </div>

        </div>
      </div>
    )
  }
}


export default ItemList
