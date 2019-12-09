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
        user: this.props.auth.auth.user.user_name,
        lat: this.props.location.lat,
        long: this.props.location.lng,
        img_url: '',
        public: true,
        category: '',
        season: '',
        quantity: null,
        image: null
      }
    }
  }

  componentDidMount() {
    getCategories().then(categoryData => {
      this.setState({ categoryData })
    })
    getSeasons().then(seasonData => {
      this.setState({ seasonData })
    })
  }

  handleChange = (e) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        [e.target.name]: e.target.value
      }
    })
  }

  handleImageUpload = (e) => {
    const data = new FormData()
    let file = e.target.files[0]
    data.append('file', file)
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                image: reader.result
            }
        })
    }
}

  handleSubmit = (e) => {
    console.log(this.state.newItem)
    e.preventDefault()
    addItem(this.state.newItem)
    fetchPublicItems()
  }

  handleCheckbox = (e) => {
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
                    Private
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
                  <label>
                    <p>Image</p>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={this.handleImageUpload}
                    />
                  </label>
                  <input type='submit' value='Submit' />
                  <br></br>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (auth) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, { hideModal })(AddModal)