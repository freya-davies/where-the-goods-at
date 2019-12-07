import React from "react"
import { connect } from 'react-redux'
import { addItem, getCategories, getSeasons } from '../apis/items'
import { fetchPublicItems } from '../actions/items'
import { hideModal } from "../actions/modals"

class AddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItem: {
        item_name: '',
        description: '',
        lat: this.props.location.lat,
        long: this.props.location.lng,
        img_url: '',
        public: false,
        category: '',
        season: '',
        quantity: null
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  componentDidMount() {
    getCategories().then(categoryData => {
      this.setState({ categoryData })
    })
    getSeasons().then(seasonData => {
      this.setState({ seasonData })
    })
  }

  handleChange(e) {
    this.setState({
      newItem: {
        ...this.state.newItem,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.newItem)
    addItem(this.state.newItem)
    fetchPublicItems()
  }

  handleCheckbox(e) {
    this.setState({
      newItem: {
        ...this.state.newItem,
        public: !this.state.newItem.public
      }
    })
  }

  closeModal = () => {
    this.props.hideModal()
  }

  render() {
    console.log(this.props.location)

    return (
      <div
        className='modal'
        id='exampleModalCenter'
        style={{ display: 'block' }}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLongTitle'>
                Modal title
              </h5>
            </div>
            <div className='modal-body'>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <h3>Add new Item</h3>
                  <label>
                    Item
                    <br></br>
                    <input
                      required
                      type='text'
                      name='item_name'
                      onChange={this.handleChange}
                    />
                  </label>
                  <br></br>
                  <label>
                    Description
                    <br></br>
                    <textarea
                      required
                      type='text'
                      name='description'
                      onChange={this.handleChange}
                    />
                  </label>
                  <br></br>
                  <label>
                    Photo
                    <br></br>
                    <input
                      required
                      type='text'
                      name='img_url'
                      onChange={this.handleChange}
                    />
                  </label>
                  <br></br>
                  <label>
                    Public
                    <input
                      type='checkbox'
                      name='public'
                      onChange={this.handleCheckbox}
                    />
                  </label>
                  <br></br>
                  <label>
                    Category
                    <select name='category' onChange={this.handleChange}>
                      <option value={0}></option>
                      {this.state.categoryData &&
                        this.state.categoryData.map((category, i) => {
                          return (
                            <option key={i} value={category.id}>
                              {category.category_name}
                            </option>
                          )
                        })}
                    </select>
                  </label>
                  <br></br>
                  <label>
                    Season
                    <select name='season' onChange={this.handleChange}>
                      <option value={0}></option>
                      {this.state.seasonData &&
                        this.state.seasonData.map((season, i) => {
                          return (
                            <option key={i} value={season.id}>
                              {season.season_name}
                            </option>
                          )
                        })}
                    </select>
                  </label>
                  <br></br>
                  <label>
                    <p>Quantity</p>
                    <input
                      required
                      name='quantity'
                      type='range'
                      min='1'
                      max='50'
                      onChange={this.handleChange}
                    />
                    {this.state.newItem.quantity}
                  </label>
                  <br></br>
                  <br></br>
                  <input type='submit' value='Submit' />
                </form>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                onClick={this.closeModal}
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">Add to Map</button> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, { hideModal })(AddModal)