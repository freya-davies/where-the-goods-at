import React from 'react'
import { addItem } from '../apis/items'

class AddItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem : {}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    
    }

    handleChange(e) {
       this.setState({
           newItem : {
               ...this.state.newItem,
               [e.target.name] : e.target.value
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
                        <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label>
                        Description
                        <input type='text' name='description' value={this.state.description} onChange={this.handleChange} />
                    </label>
                    <label>
                       Address
                        <input type='text' name='address' value={this.state.address} onChange={this.handleChange} />
                    </label>
                    {/* <label>
                        Photo
                        <input type='image' src='https://ak3.picdn.net/shutterstock/videos/1068433/thumb/1.jpg' />
                    </label> */}
                    <input type="submit" value="Submit" />
                </form>

            </div>


        )
    }
}



export default AddItemForm