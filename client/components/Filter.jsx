import React from 'react'
import { connect } from 'react-redux'
import Map from './Map'
import ItemList from './ItemList'
import { isProperty } from '@babel/types'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.items.items,
      public: true
    }
  }

  handleCategory = e => {
    this.setState({
      items: this.props.items.items.filter(
        item => item.category_id === Number(e.target.value)
      )
    })
  }

  // ------------------------
  // FREYA - want this to return either first 5 or last 5 entries
  // ------------------------
  handleRecent = e => {
    if (e.target.value == 'new') {
      const longness = this.props.items.items.length

      this.setState({
        items: this.props.items.items.map(item => {
          if (item.id > longness - 5) {
            console.log(item)
            return item
          }
        })
      })
    } else if (e.target.value == 'old') {
      const longness = this.props.items.items.length

      this.setState({
        items: this.props.items.items.map(item => {
          if (item.id < 5) {
            console.log(item)
            return item
          } else {
            return
          }
        })
      })
      console.log(this.state.items)
    } else {
      return console.log('Something is broken')
    }
  }

  handleItemDisplay = e => {
      this.setState({public: !this.state.public})
  }

  whichItems = () => {
    if(this.state.public) return this.state.items
    else return this.props.privateItems.privateItems
         
  }

  render() {
    return (
      <div className='d-flex'>
        <div className='col-8'>
          <Map items={this.whichItems()} />
        </div>

        <div>
          <div className='jumbotron jumbotron-fluid bg-main rounded'>
            <div className='container'>
              <h3 className='display-4'>Sort</h3>
              <p className='lead'></p>
              <div>
                <label htmlFor='category'>
                  Category
                  <select name='category' id='' onChange={this.handleCategory}>
                    <option value='1'>Fruit</option>
                    <option value='4'>Flowers</option>
                    <option value='5'>Other</option>
                  </select>
                </label>
              </div>

              <div>
                <label htmlFor='category'>
                  Recently Added - BROKEN BUTTON
                  <select name='category' id='' onChange={this.handleRecent}>
                    <option value='new'>Newest</option>
                    <option value='old'>Oldest </option>
                  </select>
                </label>
              </div>

              <div class='custom-control custom-switch'>
                <input
                  type='checkbox'
                  class='custom-control-input'
                  id='customSwitch1'
                  onChange={this.handleItemDisplay}
                  value={this.state.public}
                />
                <label class='custom-control-label' for='customSwitch1'>
                  Public / Private items
                </label>
              </div>

              {/* <div>
                        <label htmlFor="category">Suburb - BROKEN BUTTON
                    <select name="category" id="" onChange={this.handleRecent}> */}
              {/* what I want this to do is:
                        - map through suburb names, 
                        - only show the name if it isn't already showing
                        - bring back all items in props that include that name */}
              {/* {this.props.items.items.map((item, i) => {
                                  return  <option key={i} value={item.item_name}>{item.item_name}</option>
                                    })
                                }
                            </select>
                        </label>
                    </div> */}
            </div>
          </div>

          <div className='rounded bg-main'>
            <ItemList items={this.state.items} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, items, privateItems }) => {
  return {
    auth,
    items,
    privateItems
  }
}

export default connect(mapStateToProps)(Filter)
