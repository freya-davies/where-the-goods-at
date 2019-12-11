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
    e.preventDefault()
    addItem(this.state.newItem)
      .then(() => {
        this.props.fetchPublicItems()
        this.props.hideModal()
      })
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
                Add Item by Dropping Pin
              </h5>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Item</label>
                    <input
                      required
                      type='text'
                      name='item_name'
                      className="form-control"
                      placeholder="e.g. Parsley"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type='checkbox'
                      name='public'
                      className="form-check-input"
                      onChange={this.handleCheckbox}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Private</label>
                    <small id="subtext" className="form-text text-muted">Keep your foraging spot a secret!</small>
                  </div>
                </div>
                <div className="form-row">
                  <label>
                    Description
                    </label>
                  <textarea
                    required
                    type='text'
                    name='description'
                    className="form-control"
                    rows='3'
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label>Category</label>
                    <select name='category' onChange={this.handleChange} className="form-control">
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
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Season
                                        </label>
                    <select name='season' onChange={this.handleChange} className="form-control">
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
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="customRange1">Quantity</label>
                  <input
                    required
                    name='quantity'
                    type='range'
                    className="custom-range"
                    min='1'
                    max='20'
                    defaultValue='1'
                    onChange={this.handleChange}
                  />
                  {this.state.newItem.quantity}
                </div>
                <div className="form-row">
                  {/* select an imgage */}
                  <div className="custom-file">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={this.handleImageUpload}
                    />
                  </div>
                </div>
                <div className='modal-footer'>
                  <div className="col-auto my-1">
                    <button
                      type='submit'
                      className='btn bg-main-reverse'> Submit
                    </button>
                  </div>
                  <div className="col-auto my-1">
                    <button
                      type='button'
                      className='btn bg-main-reverse'
                      data-dismiss='modal'
                      onClick={this.closeModal}>
                      Close
                    </button>
                  </div>
                  </div>
              </form>
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

export default connect(mapStateToProps, { hideModal, fetchPublicItems })(AddModal)

