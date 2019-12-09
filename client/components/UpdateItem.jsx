import React from "react"
import { connect } from 'react-redux'
import { getItem, getCategories, getSeasons } from '../apis/items'

class UpdateItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            item: null,
            defaultSeason: ""
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
        var season = this.state.seasonData.find(season => {
            return season.id == this.state.item.season_id
        })
        return season.season_name
    }

    render() {

        return (
            <div>
                {this.state.item != null &&
                    <div className="updateItemForm">
                        <img src={this.state.item.img_url} />
                        <form onSubmit={this.handleSubmit}>
                            <label for="item_name">Item Name: </label>
                            <input name="item_name" value={this.state.item.item_name} />
                            <br></br>
                            <label for="decription">Description: </label>
                            <input name="description" value={this.state.item.description} />
                            <br></br>

                            <label for="public">Public: </label>
                            <input type="checkbox" name="public" value={this.state.item.public} />
                            <br></br>
                            <label for="category">Category: </label>
                            <select name='category'>
                                <option value={this.state.item.category}></option>
                                {this.state.categoryData &&
                                    this.state.categoryData.map((category, i) => {
                                        return (
                                            <option key={i} value={category.id}>
                                                {category.category_name}
                                            </option>
                                        )
                                    })}
                            </select>
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
                                </select>
                            }
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