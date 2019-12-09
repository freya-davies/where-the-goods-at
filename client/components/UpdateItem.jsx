import React from "react"
import { connect } from 'react-redux'
import { getItem, getCategories, getSeasons, updateItem } from '../apis/items'

class UpdateItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            item: null,
        }
    }

    componentDidMount() {
        getItem(this.props.match.params.id)
            .then(data => {
                this.setState({
                    item: data
                }, () => console.log(this.state.item))
            })

        getCategories()
            .then(categoryData => {
                this.setState({ categoryData })
            })


        getSeasons()
            .then(seasonData => {
                this.setState({ seasonData })
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
                item: {
                    ...this.state.item,
                    image: reader.result
                }
            })
        }
    }

    showItem = () => {
        let displayItem = this.props.items.items.filter(item => {
            if (item.id == this.props.match.params.id) {
                return item
            }
        })
        this.setState({
            items: displayItem
        })
    }


    getSeasonName() {
        let season = this.state.seasonData.find(season => {
            return season.id == this.state.item.season_id
        })
        return season.season_name
    }

    getCategoryName() {
        let category = this.state.categoryData.find(category => {
            return category.id == this.state.item.category_id
        })
        return category.category_name
    }

    handleClick = () => {
        this.setState({
            item: {
                ...this.state.item,
                public: !this.state.item.public
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        updateItem(this.state.item)
    }
    handleChange = (e) => {
        this.setState({
            item: {
                ...this.state.item,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        console.log(this.state.item)
        return (
            <div>
                {this.state.item != null &&
                    <div className="updateItemForm">
                        {/* <img src={this.state.item.img_url} />  */}

                        <form onSubmit={this.handleSubmit}>
                            <label for="image">Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={this.handleImageUpload}
                            />
                            <br></br>
                            <label for="item_name">Item Name: </label>
                            <input name="item_name" value={this.state.item.item_name} onChange={this.handleChange} />
                            <br></br>

                            <label for="description">Description: </label>
                            <textarea name="description" value={this.state.item.description} onChange={this.handleChange} />
                            <br></br>

                            <label for="public">Public: </label>
                            <input type="checkbox" name="public" checked={this.state.item.public} onClick={this.handleClick} />
                            <br></br>


                            <label for="category">Category: </label>
                            {this.state.categoryData &&
                                <select required name='category' >
                                    <option value={this.state.item.category_id}>{
                                        this.getCategoryName()
                                    }</option>
                                    {this.state.categoryData &&
                                        this.state.categoryData.map((category, i) => {
                                            return (
                                                <option key={i} value={category.id}>{category.category_name}</option>
                                            )
                                        })}
                                </select>}
                            <br></br>
                            <label for="season">Season: </label>
                            {this.state.seasonData &&
                                <select required name='season' >
                                    <option value={this.state.item.season_id}>{
                                        this.getSeasonName()
                                    }</option>
                                    {this.state.seasonData &&
                                        this.state.seasonData.map((season, i) => {
                                            return (
                                                <option key={i} value={season.id}>{season.season_name}</option>
                                            )
                                        })}
                                </select>}
                            <br></br>
                            <button type='submit' value='Submit'>Update Item</button>
                        </form>

                    </div>
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