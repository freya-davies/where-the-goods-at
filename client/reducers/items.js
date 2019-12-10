
const initialState = {
  items: [],
  isFetching: false,
}

export default function items (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PUBLIC_ITEMS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_PUBLIC_ITEMS':
      return {
        items: action.items,
        isFetching: false
      }
      case 'UPDATE_ITEM':
      return state.map((item => { 
        if(item == action.items) {
          return action.items = action.updateItem
        } else {
          return item
        }
      } 
      ))
    default: 
      return state
  }
}
