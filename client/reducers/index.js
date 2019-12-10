import {combineReducers} from 'redux'

import items from './items'
import auth from './auth'
import modals from './modals'
import privateItems from './privateItems'
import currentItem from './currentItem'

export default combineReducers({
  items,
  auth,
  modals,
  privateItems,
  currentItem,
})
