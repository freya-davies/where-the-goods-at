import React from 'react'
import { connect } from 'react-redux'


class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <h1>Hello Landing Page</h1>
      </React.Fragment>

    )
  }
}



const mapStateToProps = ({ items }) => {
  return {
    items
  }
}

export default connect(mapStateToProps)(Landing)