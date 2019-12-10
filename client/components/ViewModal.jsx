import React from "react"
import { connect } from 'react-redux'

class ViewModal extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            // item: {
            //     item_name: '',
            //     comments: '',
            //     description: '',
            //     lat: this.props.location.lat,
            //     long: this.props.location.lng,
            //     img_url: '',
            //     public: false,
            //     category: '',
            //     season: '',
            //     quantity: null
            //   }
        }
    }

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
                        Modal title
                    </h5>
                    </div>
                    <div className='modal-body'>
                    <div>
                        {/* <form onSubmit={this.handleSubmit}>
                        <label>
                            Item
                            <br></br>
                            <input
                            required
                            type='text'
                            name='item_name'
                            onChange={this.handleChange}
                            />
                        </label>
                        <br></br>
                        <label>
                            Description
                            <br></br>
                            <textarea
                            required
                            type='text'
                            name='description'
                            onChange={this.handleChange}
                            />
                        </label>
                        <br></br>
                        <label>
                            Photo
                            <br></br>
                            <input
                            required
                            type='text'
                            name='img_url'
                            onChange={this.handleChange}
                            />
                        </label>
                        <br></br>
                        <label>
                            Public
                            <input
                            type='checkbox'
                            name='public'
                            onChange={this.handleCheckbox}
                            />
                        </label>
                        <br></br>
                        <label>
                            Category
                            <select name='category' onChange={this.handleChange}>
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
                        </label>
                        <br></br>
                        <label>
                            Season
                            <select name='season' onChange={this.handleChange}>
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
                        </label>
                        <br></br>
                        <label>
                            <p>Quantity</p>
                            <input
                            required
                            name='quantity'
                            type='range'
                            min='1'
                            max='50'
                            onChange={this.handleChange}
                            />
                            {this.state.newItem.quantity}
                        </label>
                        <br></br>
                        <br></br>
                        <input type='submit' value='Submit' />
                        </form> */}
                    </div>
                    </div>
                    <div className='modal-footer'>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        data-dismiss='modal'
                        // onClick={this.closeModal}
                    >
                        Close
                    </button>
                    {/* <button type="button" className="btn btn-primary">Add to Map</button> */}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps)(ViewModal)