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

    sortNumberNewest = (a, b) => {
        return a - b;
    }

    sortNumberNewest = (a, b) => {
        return a - b;
    }

    shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    handleRecent = (e) => {
        // want this to:
        // sort throught the arrays timestamp (created_at) and return the whole array in order of latest. 

        if(e = 'new') {
           return this.setState({
                items: this.props.items.items.sort(item => console.log("NEW" + e.target.value))
            })
        } else
        if (e = 'old') {
            return console.log('hello!')
            //   return  this.setState({
                //         items: this.props.items.items.sort(item => console.log("OLD" + e.target.value))
            } else 
            if (e = 'random') {

            // shuffleArray(this.state.)
            console.log(this.props.items.items.sort(item => console.log("RAN" + item)))
        } else {
            return console.log('Something is broken')
        }
            // sortNumber(item)
    }


    render() {

        return (
            <div className='d-flex'>
                <div className='col-8'>
                    <Map items={this.state.items} />
                </div>

                <div className='col-md-auto'>
                    <h2>Sort by: </h2>

                    <div>
                        <label htmlFor="category">Category
                    <select name="category" id="" onChange={this.handleCategory}>
                                <option value="1">Fruit</option>
                                <option value="4">Flowers</option>
                                <option value="5">Other</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="category">Recently Added
                    <select name="category" id="" onChange={this.handleRecent}>
                                <option value="new">Newest</option>
                                <option value="old">Oldest </option>
                                <option value="random">Randomly</option>
                            </select>
                        </label>
                    </div>
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