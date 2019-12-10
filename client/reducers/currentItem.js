
const initialState = null

export default function currentItems (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_CURRENT_ITEM':
      return action.item
    default: 
      return state
  }
}