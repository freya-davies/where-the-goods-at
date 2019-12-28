import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Map from './Map'
import ItemList from './ItemList'
import FilterBox from './FilterBox'

export class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.items.items,
      public: true,
      order: "default"
    }
  }

  componentDidMount() {
    this.sortItems()
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items && this.state.public) {
      this.setState({ items: this.props.items.items })
    }

    if (this.props.privateItems !== prevProps.privateItems && !this.state.public) {
      this.setState({ items: this.props.privateItems.privateItems})
    }
  }

  handleCategory = e => {
      const items = this.state.public ? this.props.items.items : this.props.privateItems.privateItems

      if (e.target.value == 0) {
        this.setState({
          items: items
        })
      } else {
        this.setState({
          items: items.filter(
            item => item.category_id === Number(e.target.value)
          )
        })
      }
  }

  handleSeason = e => {
    const items = this.state.public ? this.props.items.items : this.props.privateItems.privateItems

    if (e.target.value == 0) {
      this.setState({
        items: items
      })
    } else {
      this.setState({
        items: items.filter(
          item => item.season_id === Number(e.target.value) || item.season_id === 5
        )
      })
    }
  }

  handleRecent = e => {
    this.setState({
      order: e.target.value
    }, this.sortItems)
  }

  handleItemDisplay = e => {
    this.setState({
      public: !this.state.public
    }, () => {
      //document.getElementById('category-select').value = 0
      if (this.state.public) {
        this.setState({ items: this.props.items.items })
        // document.getElementById('public').classList.remove('highlightViewMode')
        // document.getElementById('private').classList.add('highlightViewMode')
      } else {
        this.setState({ items: this.props.privateItems.privateItems })
        // document.getElementById('public').classList.add('highlightViewMode')
        // document.getElementById('private').classList.remove('highlightViewMode')
      }
    })
  }

  sortItems() {
    let { items, order } = this.state

    if (order == 'default') {
      items.sort((a, b) => {
        return a.item_name > b.item_name ? 1 : -1
      })
    } if (order == 'new') {
      items.sort((a, b) => {
        return a.id > b.id ? -1 : 1
      })
    } else if (order == 'old') {
      items.sort((a, b) => {
        return a.id < b.id ? -1 : 1
      })
    }
    this.setState({ items: items })
  }


  render() {
    const isAuthenticated = this.props.auth.isAuthenticated

    return (
      <div className='row mx-0' style={{width: '100vw !important'}}>
        <div className='col-sm-12 col-md-12 col-lg-8 mt-3 mapDiv' >
          <Map items={this.state.items} />
        </div>

        <div className='col-sm-12 col-md-12 col-lg-4 mt-3'>
          <div className='container rounded bg-main mb-3 sort-cont'>
            <h3 className="sort-heading">Sort</h3>

            <FilterBox handleCategory={this.handleCategory} handleSeason={this.handleSeason} handleRecent={this.handleRecent} />

            {/* Switch between public and private */}
            {isAuthenticated ?
              <>
                <header className="card-header filter-options view-header">
                  <h6 className="title my-0">View</h6>
                </header>
                <div className='custom-control custom-switch pt-0'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='customSwitch1'
                    onChange={this.handleItemDisplay}
                    value={this.state.public} />
                  <label className='custom-control-label' htmlFor='customSwitch1'>
                    <div className='d-flex'>
                    <div id='public' className={this.state.public ? 'px-1 highlightViewMode' : 'px-1'}>Public</div>
                        <div id='private' className={!this.state.public ? 'px-1 highlightViewMode' : 'px-1'}>Private</div>
                    </div>
                  </label>
                </div>
              </>
              :
              <>
                <header className="card-header filter-options view-header">
                  <h6 className="title my-0">View </h6>
                </header>
                <Link to='/login'>
                  <div className='custom-control custom-switch pt-0'>
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='customSwitch1'
                      onChange={this.handleItemDisplay}
                      value={true} />
                    <label className='custom-control-label' htmlFor='customSwitch1'>
                      <div className='d-flex'>
                        <div id='public' className='px-1 highlightViewMode'>Public</div>
                        <div id='private' className='px-1'>Private</div>
                      </div>
                    </label>
                  </div>
                </Link>
              </>
            }
          </div>

          <ItemList items={this.state.items} dispatch={this.props.dispatch} auth={this.props.auth} />
        </div>
      </div >
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

