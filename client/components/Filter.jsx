import React from 'react'
import { connect } from 'react-redux'
import Map from './Map'
import ItemList from './ItemList'
import { Link } from 'react-router-dom'

export class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.items.items,
      public: true
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
    /*
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
       */
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


  handleRecent = e => {
    this.setState({
      order: e.target.value
    }, this.sortItems)
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


    // this.handleToggleHighlight()
    // refactor should get rid of this function
  }


  handleToggleHighlight = () => {
    if (this.state.public) {
      document.getElementById('public').classList.remove('highlightViewMode')
      document.getElementById('private').classList.add('highlightViewMode')
    } else if (!this.state.public) {
      document.getElementById('public').classList.add('highlightViewMode')
      document.getElementById('private').classList.remove('highlightViewMode')
    }
  }


  sortItems() {
    let { items, order } = this.state
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
    this.setState({ items: items })
  }


  render() {
    const isAuthenticated = this.props.auth.isAuthenticated

    return (
      <div className='row px-2'>
        <div className='col-sm-12 col-md-12 col-lg-8 mt-3'>
          <Map items={this.state.items} />
        </div>

        <div className='col-sm-12 col-md-12 col-lg-4 mt-3'>
          <div className='container rounded bg-main mb-3 sort-cont'>
            <h3 className="sort-heading">Sort</h3>

            {/* Category dropdown */}
            <article className="card-group-item">
              <header className="card-header filter-options">
                <h6 className="title">Category </h6>
              </header>
              <div className="filter-content">
                <div className="list-group list-group-flush">
                  <select name='category' id='category-select' onChange={this.handleCategory}>
                    <option value='0' className="dropdown-item">All</option>
                    <option value='1' className="dropdown-item">Fruit</option>
                    <option value='2' className="dropdown-item">Vegetables</option>
                    <option value='3' className="dropdown-item">Herbs</option>
                    <option value='4' className="dropdown-item">Flowers</option>
                    <option value='5' className="dropdown-item">Other</option>
                  </select>
                </div>
              </div>
            </article>

            {/* Seasons dropdown */}
            <article className="card-group-item">
              <header className="card-header filter-options">
                <h6 className="title">Season </h6>
              </header>
              <div className="filter-content">
                <div className="list-group list-group-flush">
                  <select name='category' id='category-select' onChange={this.handleSeason}>
                    <option value='0'>All</option>
                    <option value='1'>Summer</option>
                    <option value='2'>Autumn</option>
                    <option value='3'>Winter</option>
                    <option value='4'>Spring</option>
                  </select>
                </div>
              </div>
            </article>

            {/* Recently dropdown */}
            <article className="card-group-item">
              <header className="card-header filter-options">
                <h6 className="title">Recently Added </h6>
              </header>
              <div className="filter-content">
                <div className="list-group list-group-flush">
                  <select name='category' id='' onChange={this.handleRecent}>
                    <option value='default'>A-Z</option>
                    <option value='new'>Newest</option>
                    <option value='old'>Oldest </option>
                  </select>
                </div>
              </div>
            </article>

            {/* {isAuthenticated &&
              <>
                <header className="card-header filter-options view-header">
                  <h6 className="title">View </h6>
                </header>
                <div className='custom-control custom-switch'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='customSwitch1'
                    onChange={this.handleItemDisplay}
                    value={this.state.public} />
                  <label className='custom-control-label' htmlFor='customSwitch1'>
                    <div className='d-flex'>
                      <div id='public' className={this.state.public ? 'px-1 highlightViewMode' : 'px-1'}>Public</div>
                      <div id='private' className={this.state.public ? 'px-1' : 'px-1 highlightViewMode'}>Private</div>
                    </div>
                  </label>
                </div>
              </>
            } */}



            {isAuthenticated ?
              <>
                <header className="card-header filter-options view-header">
                  <h6 className="title">View </h6>
                </header>
                <div className='custom-control custom-switch'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='customSwitch1'
                    onChange={this.handleItemDisplay}
                    value={this.state.public} />
                  <label className='custom-control-label' htmlFor='customSwitch1'>
                    <div className='d-flex'>
                      <div id='public' className='px-1 highlightViewMode'>Public</div>
                      <div id='private' className='px-1'>Private</div>
                    </div>
                  </label>
                </div>
              </>
              :
              <>
                <header className="card-header filter-options view-header">
                  <h6 className="title">View </h6>
                </header>
                <Link to='/login'>
                  <div className='custom-control custom-switch'>
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='customSwitch1'
                      onChange={this.handleItemDisplay}
                      value={this.state.public} />
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

          <div className='container rounded bg-main mb-3 item-cont'>
            <ItemList items={this.state.items} dispatch={this.props.dispatch} auth={this.props.auth} />
          </div>
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
