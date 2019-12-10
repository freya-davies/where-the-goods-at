import React from "react"
import { connect } from 'react-redux'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import { addItem, getCategories, getSeasons } from '../apis/items'
import { fetchPublicItems, fetchPrivateItems } from '../actions/items'
import { hideModal } from "../actions/modals"

class AddItemByAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: {
                item_name: '',
                user: this.props.auth.auth.user.user_name,
                description: '',
                address: '',
                // img_url: '',
                public: true,
                category: '',
                season: '',
                // rating: null,
                quantity: null,
                image: null
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImageUpload = this.handleImageUpload.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleAddressSuggestion = this.handleAddressSuggestion.bind(this)
    }

    componentDidMount() {
        getCategories().then(categoryData => {
            this.setState({ categoryData })
        })
        getSeasons().then(seasonData => {
            this.setState({ seasonData })
        })
    }

    handleChange(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        })
    }

    handleImageUpload(e) {
        const data = new FormData()
        let file = e.target.files[0]
        data.append('file', file)
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    image: reader.result
                }
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        addItem(this.state.newItem)
            .then(res => {
                if(res == 200) {
                    if(this.state.newItem.public) this.props.fetchPublicItems()
                    else {
                        this.props.fetchPrivateItems(this.props.auth.auth.user.user_name)}
                    }
                    this.props.toggleAddForm()
            })
    }

    handleCheckbox(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                public: !this.state.newItem.public
            }
        })
    }

    closeModal = () => {
        this.props.hideModal()
    }

    handleAddress = e => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                address: e
            }
        })
    }

    handleAddressSuggestion(suggestion) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                address: suggestion
            }
        })
    }
    
    // validateAddress() {
    //     //call in handleSubmit
    //     geocodeByAddress(this.state.newItem.address)
    //         .then(results => getLatLng(results[0]))
    //         .then(latLng => console.log('Success', latLng))
    //         .catch(error => console.error('Error', error));
    // }

    render() {
        return (
            <div
                className='modal'
                id='exampleModalCenter'
                style={{ display: 'block' }}
                tabIndex='-1'
                role='dialog'
                aria-labelledby='exampleModalCenterTitle'
                aria-hidden='true'
            >
                <div className='modal-dialog modal-dialog-centered' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLongTitle'>
                                Add Item by Address
              </h5>
                        </div>
                        <div className='modal-body'>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">

                                        <label>
                                            Item
                                                </label>
                                        <input
                                            required
                                            type='text'
                                            name='item_name'
                                            className="form-control"
                                            placeholder="eg; Parsley"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type='checkbox'
                                            name='public'
                                            className="form-check-input"
                                            onChange={this.handleCheckbox}
                                        />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Private</label>
                                        <small id="subtext" className="form-text text-muted">Keep your foraging spot a secret!</small>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <PlacesAutocomplete
                                        value={this.state.newItem.address}
                                        name='address'
                                        onChange={this.handleAddress}
                                        onSelect={this.handleSelect}
                                        searchOptions={{
                                            location: new google.maps.LatLng(-41.2743523, 174.735582),
                                            radius: 1000,
                                            types: ['address']
                                        }}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <label>
                                            Address
                                                {/* <input
                                                required
                                                type='text'
                                                name='address'
                                                className="form-control"
                                                onChange={this.handleChange}
                                                /> */}
                                                <input
                                                required
                                                type='text'
                                                name='address'
                                                {...getInputProps({
                                                    placeholder: 'Search Places ...',
                                                    className: 'form-control location-search-input',
                                                })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                        })}
                                                        onClick={() => this.handleAddressSuggestion(suggestion.description)}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                    );
                                                })}
                                                </div>
                                        </label>
                                    )}
                                    </PlacesAutocomplete>   
                                </div>
                                <div className="form-row">
                                    <label>
                                        Description
                                            </label>
                                    <textarea
                                        required
                                        type='text'
                                        name='description'
                                        className="form-control"
                                        rows='3'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label>Category</label>
                                        <select name='category' onChange={this.handleChange} className="form-control">
                                            <option value={0}></option>
                                            {this.state.categoryData &&
                                                this.state.categoryData.map((category, i) => {
                                                    return (
                                                        <option key={i} value={category.id}>
                                                            {category.category_name}
                                                        </option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>
                                            Season
                                        </label>
                                        <select name='season' onChange={this.handleChange} className="form-control">
                                            <option value={0}></option>
                                            {this.state.seasonData &&
                                                this.state.seasonData.map((season, i) => {
                                                    return (
                                                        <option key={i} value={season.id}>
                                                            {season.season_name}
                                                        </option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="customRange1">Quantity</label>
                                    <input
                                        required
                                        name='quantity'
                                        type='range'
                                        className="custom-range"
                                        min='1'
                                        max='50'
                                        defaultValue='1'
                                        onChange={this.handleChange}
                                    />
                                    {this.state.newItem.quantity}
                                </div>
                                <div className="form-row">

                                    <label>
                                        <p>Add Image</p>
                                    </label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={this.handleImageUpload}
                                        />
                                    </div>

                                </div>
                                <div className='modal-footer'>
                                    <div className="col-auto my-1">
                                        <button
                                            type='submit'
                                            className='btn btn-secondary'> Submit
                                    </button>
                                    </div>
                                    <div className="col-auto my-1">
                                        <button
                                            type='button'
                                            className='btn btn-secondary'
                                            data-dismiss='modal'
                                            onClick={this.props.toggleAddForm}>
                                            Close</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (auth) => {
    return {
        auth
    }
}

export default connect(mapStateToProps, { hideModal, fetchPublicItems, fetchPrivateItems })(AddItemByAddress)