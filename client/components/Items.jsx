import React from 'react'
import { connect } from 'react-redux'
import { addItem, getCategories, getSeasons } from '../apis/items'

class AddItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItem: {
        item_name: '',
        user: this.props.auth.auth.user.user_name,
        description: '',
        address: '',
        img_url: '',
        public: false,
        category: '',
        season: '',
        quantity: null,
        image: null
      },
      formAdded: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)

  }

  componentDidMount() {
    getCategories()
      .then(categoryData => {
        this.setState({ categoryData })
      })
    getSeasons()
      .then(seasonData => {
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

  handleImageUpload(e) {
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


  handleSubmit(e) {
    e.preventDefault()
    addItem(this.state.newItem)
      .then(res => {
        if (res == 200) this.setState({ formAdded: true })
      })
  }

  handleCheckbox(e) {
    this.setState({
      newItem: {
        ...this.state.newItem,
        public: !this.state.newItem.public
      }
    })
  }

  render() {
    return (
      <div>{
        this.state.formAdded ?
          <p className='display-4'>SUCCESS</p>
          :
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
              Address
                <br></br>
              <input
                required
                type='text'
                name='address'
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
                <select required name='category' onChange={this.handleChange}>
                <option value=''></option>
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
                <select required name='season' onChange={this.handleChange}>
                <option value=''></option>
                {this.state.seasonData &&
                  this.state.seasonData.map((season, i) => {
                    return (
                      <option key={i} value={season.id}>{season.season_name}</option>
                    )
                  })}
              </select>
            </label>
            <br></br>
            <label>
              <p>Quantity</p>
              <input
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
          </form>
      }</div>
    )
  }
}

const mapStateToProps = auth => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(AddItemForm)