import React from "react"

class InfoModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            newItem: {
                item_name: "",
                description: "",
                lat: this.props.location.lat,
                long: this.props.location.lng,
                public: false,
                category: "",
                season: "",
                quantity: null,
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)

    }

    handleChange(e) {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        })

    }

    handleSubmit(e) {
        e.preventDefault()
        addItem(this.state.newItem)
        fetchPublicItems()
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


    render() {
        return (
            <div className="modal" id="exampleModalCenter" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        </div>
                        <div className="modal-body">


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
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


export default InfoModal