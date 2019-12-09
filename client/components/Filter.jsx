import React from 'react'
import { connect } from 'react-redux'
import Map from './Map'
import ItemList from './ItemList'
import { isProperty } from '@babel/types'
import { findSuburb } from '../apis/itemList'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.items.items,
      public: true,
      order: 'default'
    }
  }

  componentDidMount() {
    // Make listed items alphabetical
    // console.log(this.state.items)
    this.sortItems()
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


  handleSeason = e => {
    if (this.state.public) {
      if (e.target.value == 0) {
        this.setState({
          items: this.props.items.items
        })
      } else {
        console.log(this.props.items.items)
        this.setState({
          items: this.props.items.items.filter(
            item => item.season_id === Number(e.target.value) || item.season_id === 5
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
            item => item.season_id === Number(e.target.value) || item.season_id === 5
          )
        })
      }
    }
  }


  // set state and then run sortItems function once state has been set
  handleRecent = e => {
    this.setState({
      order: e.target.value
    },this.sortItems)
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


  sortItems() {
    let {items, order} = this.state
    // is the same as: let items = this.state.items

    if (order == 'default') {
        items.sort((a, b) => {
          return a.item_name > b.item_name ? 1 : -1
      }) 
    } else if (order == 'new') {
        items.sort((a, b) => {
          return a.id > b.id ? -1 : 1
        })
    } else if (order == 'old') {
        items.sort((a, b) => {
          return a.id < b.id ? -1 : 1
        })
    }
    this.setState({items: items})
  }

  render() {
    return (
      <div className='row px-2'>
        <div className='col-sm-12 col-md-8'>
          <Map items={this.state.items} />
        </div>

        <div className='col-sm-12 col-md-4'>
          <div className='container rounded bg-main mb-3'>
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

            {/* Seasons dropdown */}
            <div>
              <label htmlFor='category'>
                Season
                <select name='category' id='category-select' onChange={this.handleSeason}>
                  <option value='0'>All</option>
                  <option value='1'>Summer</option>
                  <option value='2'>Autumn</option>
                  <option value='3'>Winter</option>
                  <option value='4'>Spring</option>
                </select>
              </label>
            </div>

            {/* Recently dropdown */}
            <div>
              <label htmlFor='category'>
                Recently Added
                <select name='category' id='' onChange={this.handleRecent}>
                  <option value='default'>A-Z</option>
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
