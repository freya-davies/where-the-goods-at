import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Map from './Map'
import Items from './Items'      
import Filter from './Filter'
import PopUp from './PopUp'
import ItemList from './ItemList'
import ModalConductor from './ModalConductor'

import { fetchPublicItems } from '../actions/items'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.fetchPublicItems()
  }

  render() {
    return (
      <>
      { this.props.modals.currentModal && <ModalConductor modal={this.props.modals} /> }
      <Router>
        <Nav />
            {this.props.items.items.length > 0 &&
              <Route exact path="/" component={Filter} />
            }
            <Route exact path="/" component={PopUp} />
            <Route exact path="/" component={ItemList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
              {this.props.auth.isAuthenticated &&
                <Route path='/add' component={Items} />} 
      </Router>
      </>
    )
  }
}

const mapStateToProps = ({ auth, items, modals }) => {
  return {
    auth,
    items,
    modals
  }
}

export default connect(mapStateToProps, { fetchPublicItems })(App)
