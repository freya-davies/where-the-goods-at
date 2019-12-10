import React from 'react'
import { connect } from 'react-redux'
import Map from './Map'
import ItemList from './ItemList'

export class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.items.items,
      public: true
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.items !== prevProps.items){
      this.setState({items: this.props.items.items})
    }
  }

  handleCategory = e => {
    if (this.state.public) {
      if (e.target.value == 0) {
        this.setState({
          items: this.props.items.items
        })
      } else {
        this.setState({
          items: this.props.items.items.filter(
            item => item.category_id === Number(e.target.value)
          )
        })
      }
    } else {
      if (e.target.value == 0) {
        this.setState({
          items: this.props.privateItems.privateItems
        })
      } else {
        this.setState({
          items: this.props.privateItems.privateItems.filter(
            item => item.category_id === Number(e.target.value)
          )
        })
      }
    }
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
    this.setState({ 
      public: !this.state.public 
    }, () => {
      document.getElementById('category-select').value = 0
      if (this.state.public) {
        this.setState({ items: this.props.items.items })
      } else {
        this.setState({ items: this.props.privateItems.privateItems })
      }
    })
  }

  render() {
    return (
      <div className='row px-2'>
        <div className='col-sm-12 col-md-8'>
          <Map id='MappyMap' items={this.state.items} />
        </div>

        <div className='col-sm-12 col-md-4'>
          <div id='sort'className='container rounded bg-main mb-3'>
            <h3 className='display-4'>Sort</h3>
            <div>
              <label htmlFor='category'>
                Category
                <select name='category' id='category-select' onChange={this.handleCategory}>
                  <option value='0'>All</option>
                  <option value='1'>Fruit</option>
                  <option value='2'>Vegetables</option>
                  <option value='3'>Herbs</option>
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

            {/* fix me the toggle */}
            <div className='custom-control custom-switch'>
              Public
              <input
                type='checkbox'
                className='custom-control-input'
                id='customSwitch1'
                onChange={this.handleItemDisplay}
                value={this.state.public}
              />
              <label className='custom-control-label' htmlFor='customSwitch1'>
                Private
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

          <div id='listedItems'className='rounded bg-main'>
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
