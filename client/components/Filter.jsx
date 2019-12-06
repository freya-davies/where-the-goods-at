import React from 'react'
import { connect } from 'react-redux'
import Map from './Map'


class Filter extends React.Component{
    constructor(props){
        super(props)

    }

    render(){

        const {items} = this.props.items
        return(
            <>
            <Map items={items}/>
            </>
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