import React from "react"
import { connect } from 'react-redux'
import { getItem } from '../apis/items'

class UpdateItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           items : this.props.items.items
        }
    }

    componentDidMount() {
        console.log(this.props)
        console.log(this.props.items)
        // console.log(getItem)
        
    }

    handleClick = () => {
    let displayItem = this.props.items.items.filter(item => {
            if (item.id == this.props.match.params.id) {
                return item
            }       
         })
         console.log(displayItem)

        this.setState({
            items: displayItem
        })
    }

    render() {
        // console.log(this.props.items)
        // console.log(this.props.match.params.id)
        return (
            <div>
                <button onClick={this.handleClick}>Display Item</button>{
                    this.state.items.length < 1 ?
                    <p>Click me!</p>
                    :
                    <>
                    <p>{this.state.items[0].item_name}</p>
                    <img src={this.state.items[0].img_url}/>
                    <p>Description: {this.state.items[0].description}</p>
                    <p>Public: {this.state.items[0].public}</p>
                    <p>Category: {this.state.items[0].category}</p>
                    <p>Quantity: {this.state.items[0].quantity}</p>
                    <p>Season: {this.state.items[0].season}</p>
                    </>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ items }) => {
    return {
        items
    }
}

export default connect(mapStateToProps)(UpdateItem)