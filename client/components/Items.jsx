import React from 'react'
import { addItem } from '../apis/items'

class AddItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImage = this.handleImage.bind(this)
    }

    handleChange(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        })
    }

    handleImage(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                img: URL.createObjectURL(e.target.files[0])
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        addItem(this.state.newItem)

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Add new Item</h3>
                    <label>
                        Item
                        <br></br>
                        <input type='text' name='name' onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Description
                        <br></br>
                        <textarea type='text' name='description' onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Address
                        <br></br>
                        <input type='text' name='address' onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Photo
                        <br></br>
                        <input type="file" name="image" accept="image/*" onChange={this.handleImage} />
                        <img src={this.state.newItem.img} />
                    </label>
                    <br></br>
                    <label>
                        Public
                        <input type='checkbox' name='public' />
                        Private
                        <input type='checkbox' name='private' />
                    </label>
                    <br></br>
                    <label>
                        Category
                        <select>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        Season
                        <select>
                            <option value="summer">Summer</option>
                            <option value="spring">Spring</option>
                            <option value="autumn">Autumn</option>
                            <option value="winter">Winter</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        <div>
                            <p>Quantity</p>
                            <input type="range" min="1" max="50" value="25" />
                        </div>
                    </label>
                    <br></br>
                    <p>Rating</p>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

// checkbox for public/private - boolean 
// dropdown for category 
// dropdown for season 4 seasons + other
// quantity - slider 
// rating - integer 1-5
// upload image

export default AddItemForm