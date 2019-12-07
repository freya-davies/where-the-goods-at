import {combineReducers} from 'redux'

import items from './items'
import auth from './auth'
import modals from './modals'

export default combineReducers({
  items,
  auth,
  modals
})
