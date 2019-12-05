import React from 'react'
import { addItem } from '../apis/items'

class AddItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: {},
        
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
        console.log(this.state)
    }

    handleImage(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.files[0]
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
                        Name
                        <input type='text' name='name' onChange={this.handleChange} />
                    </label>
                    <label>
                        Description
                        <input type='text' name='description' onChange={this.handleChange} />
                    </label>
                    <label>
                        Address
                        <input type='text' name='address' onChange={this.handleChange} />
                    </label>
                    <label>
                        Photo
                    <input type="file" name="image" accept="image/*" onChange={this.handleImage} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default AddItemForm