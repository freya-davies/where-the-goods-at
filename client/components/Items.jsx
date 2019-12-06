import React from 'react'
import { addItem } from '../apis/items'
// import StarRating from 'react-svg-star-rating'

class AddItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: {
                item_name: "",
                description: "",
                address: "",
                image: "",
                public: false,
                category: "",
                season: "",
                // rating: null, 
                quantity: null,
            },
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        // this.onStartClick= this.onStartClick.bind(this)

    }

    // onStartClick(name, nextValue, prevValue) {
    //     this.setState({
    //         newItem: {
    //             ...this.state.newItem,
    //             rating: nextValue
    //         }})

    // }

    handleChange(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        })
        console.log(e.target.value)
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

    handleCheckbox(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                public: !this.state.newItem.public
            }
        })
        console.log(this.state.newItem.public)
    }


    render() {
        // const {rating} = this.state
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
                        <input type='checkbox' name='public' onChange={this.handleCheckbox} />
                    </label>
                    <br></br>
                    <label>
                        Category
                        <select name='category' onChange={this.handleChange}>
                            <option value="fruit">Fruit</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="herbs">Herbs</option>
                            <option value="flowers">Flowers</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        Season
                        <select name='season' onChange={this.handleChange}>
                            <option value="summer">Summer</option>
                            <option value="spring">Spring</option>
                            <option value="autumn">Autumn</option>
                            <option value="winter">Winter</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        <p>Quantity</p>
                        <input name="quantity" type="range" min="1" max="50" onChange={this.handleChange} />{this.state.newItem.quantity}
                        
                    </label>
                    <br></br>
                    {/* <p>Rating</p>
                    <StarRating
                        name = 'rate1'
                        starCount={5}
                        value={rating}
                        onClick={this.onStartClick}
                        /> */}
                    {/* <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>*/}
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