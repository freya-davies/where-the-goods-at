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
    console.log(this.state.items)
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
        this.setState({
          items: this.props.items.items.filter(
            item => item.season_id === Number(e.target.value)
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
            item => item.season_id === Number(e.target.value)
          )
        })
      }
    }
  }


  handleRecent = e => {
    this.setState({
      order: e.target.value
    })
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


  sortItems(items, order) {
    if (order == 'default') {
      return items.sort((a, b) => {
        return a.item_name > b.item_name ? 1 : -1
      })
      console.log(items)
    } else if (order == 'new') {
      return items.sort((a, b) => {
        return a.id > b.id ? -1 : 1
      })
      console.log(items)
    } else if (order == 'old') {
      return items.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
      console.log(items)
    }
    // return items
  }

  render() {


    // Make listed items show suburb
    // this.props.items.items.sort((a, b) => {
    //   return a.suburb > b.suburb ? 1 : -1
    // })
    console.log(this.state.order)
    let itemsArray = this.sortItems(this.state.items, this.state.order)

    return (
      <div className='d-flex px-2'>
        <div className='col-8'>
          <Map items={this.state.items} />
        </div>

        {/* Category dropdown */}
        <div >
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
            <ItemList items={itemsArray} />
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
