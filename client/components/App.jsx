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
import LandingPage from './LandingPage'
import ModalConductor from './ModalConductor'



import { fetchPublicItems, fetchPrivateItems } from '../actions/items'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.fetchPublicItems()
  }

  componentDidUpdate(prevProps){
    if(this.props.auth.isAuthenticated){
      if(this.props.privateItems === prevProps.privateItems){
        this.props.fetchPrivateItems(this.props.auth.user.user_name)
      }
    }else if(!this.props.auth.isAuthenticated){
      //when logging out remove privateItems state from redux state
    }
  }

  render() {
    //console.log(this.props)
    return (
      <>
      { this.props.modals.currentModal && <ModalConductor modal={this.props.modals} /> }
      <Router>
        <Nav />
            {this.props.items.items.length > 0 &&
              <Route exact path="/" component={Filter} />
            }
            {!(localStorage.getItem('UrbanForagerRemembersMe')) &&
            <Route exact path="/" component={LandingPage} />
            }

            <Route exact path="/" component={PopUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
              {this.props.auth.isAuthenticated &&
                <Route path='/add' component={Items} />} 
      </Router>
      </>
    )
  }
}

const mapStateToProps = ({ auth, items, modals, privateItems }) => {
  return {
    auth,
    items,
    modals,
    privateItems
  }
}

export default connect(mapStateToProps, { fetchPublicItems, fetchPrivateItems })(App)
//could be mapping dispatch to props