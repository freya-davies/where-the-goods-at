import React from 'react'
import { connect } from 'react-redux'
import Map from './Map'


class Filter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: this.props.items.items,
        }
    }

    handleCategory = (e) => {

        this.setState({
            items: this.props.items.items.filter(item => item.category_id === Number(e.target.value))
        })


    }

    render() {

        return (
            <div className='d-flex'>
                <div className='col-8'>
                    <Map items={this.state.items} />
                </div>

                <div className='col-md-auto'>

                    <label htmlFor="category">Category
                    <select name="category" id="" onChange={this.handleCategory}>
                            <option value="1">Fruit</option>
                            <option value="4">Flowers</option>
                            <option value="5">Other</option>
                        </select>
                    </label>
                </div >
    
                <div className='col-md-auto'>
                    <label htmlFor="category">Recent
                    <select name="category" id="" onChange={this.handleCategory}>
                            <option value="1">Fruit</option>
                            <option value="4">Flowers</option>
                            <option value="5">Other</option>
                        </select>
                    </label>
                </div >
            </div >
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