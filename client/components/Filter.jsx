import React from 'react'
import { connect } from 'react-redux'
import Map from './Map'


class Filter extends React.Component{
    constructor(props){
        super(props)

    }

    handleCategory = (e) => {
        
        console.log(e.target.value)
    }

    render(){
        console.log(this.props.items.items)
        const {items} = this.props.items
        return(
            <div className='d-flex'>
            <Map items={items}/>

            <div>
                <label htmlFor="category">Category
                    <select name="category" id="" onChange={this.handleCategory}>
                        <option value="1">Fruit</option>
                        <option value="4">Flowers</option>
                        <option value="5">Other</option>
                    </select>
                </label>
            </div>
            </div>
        )
    }
}

const mapStateToProps = ({ auth, items }) => {
    return {
        auth,
        items
    }
}

export default connect(mapStateToProps)(Filter)