import React from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getItem, getCategories, getSeasons, updateItem } from '../apis/items'
import { fetchPublicItems } from '../actions/items'


class UpdateItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            item: null,
            redirect: false,
        }
    }

    componentDidMount() {
        getItem(this.props.match.params.id)
            .then(data => {
                this.setState({
                    item: data
                })
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
        (this.state.item)
        e.preventDefault()
        updateItem(this.state.item)
            .then(() => {
                this.props.fetchPublicItems()
                this.setState({
                    redirect: true
                })
            })
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
        return (
            <div>
                {this.state.item != null &&
                    <div className="updateContainer">
                        <div className="col-6 col-md-4 update-div">
                            {this.state.redirect && <Redirect to='/' />}
                            <form className="update-form" onSubmit={this.handleSubmit}>
                                <h1 className='updateTitle'>Update Your Item</h1>



                                {/* <div className="form-group col-md-6 edit-col"> */}
                                <div className="form-row update-form-row">
                                    <label htmlFor="item">
                                        Item:
                                        </label>
                                </div>
                                <div className="form-row update-form-row">
                                    <input
                                        className="form-control update"
                                        name="item_name"
                                        value={this.state.item.item_name}
                                        onChange={this.handleChange} />
                                    {/* </div> */}
                                </div>
                                    {/* <div className="form-group col-md-6 edit-col"> */}
                                    <div className="form-row update-form-row">

                                        <label htmlFor="description">Description: </label>
                                    </div>
                                    <div className="form-row update-form-row">

                                    <textarea
                                        className="form-control update"
                                        name="description"
                                        value={this.state.item.description}
                                        onChange={this.handleChange} />

                                    {/* </div> */}
                                </div>
                                <div className="form-row update-form-row">
                                    {/* <div className="form-group col-md-6 edit-col"> */}
                                    <input
                                        className="update-image"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={this.handleImageUpload}
                                    />
                                    {/* </div> */}
                                </div>
                                <div className="form-row update-form-row">
                                    <div className="form-group col-md-6 edit-col">
                                            <label className="form-check-label" htmlFor="exampleCheck1">Private:</label>
                                        </div>
                                    <div className="form-check update-check col-md-6">
                                        <input
                                            type="checkbox"
                                            name="public"
                                            className="form-check-input"
                                            checked={this.state.item.public}
                                            onClick={this.handleClick} />
                                    </div>
                                    </div>
                                <div className="form-row update-form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="category">Category: </label>
                                        {this.state.categoryData &&
                                            <select required
                                                onChange={this.handleChange}
                                                name='category'
                                                className="form-control">
                                                <option
                                                    value={this.state.item.category_id}>{
                                                        this.getCategoryName()
                                                    }</option>
                                                {this.state.categoryData &&
                                                    this.state.categoryData.map((category, i) => {
                                                        return (
                                                            <option key={i} value={category.id}>{category.category_name}</option>
                                                        )
                                                    })}
                                            </select>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="season">Season: </label>
                                        {this.state.seasonData &&
                                            <select required
                                                onChange={this.handleChange}
                                                name='season'
                                                className="form-control">
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
                                    </div>
                                </div>
                                <button
                                    type='submit'
                                    className='btn bg-main-reverse'>Update Item</button>
                            </form>
                        </div>
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

export default connect(mapStateToProps, { fetchPublicItems })(UpdateItem)