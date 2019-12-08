  
const initialState = {
  privateItems: [],
  isFetchingPrivate: false
}

export default function privateItems(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PRIVATE_ITEMS':
      return {
        ...state,
        isFetchingPrivate: true
      }
    case 'RECEIVE_PRIVATE_ITEMS':
      return {
        privateItems: action.items,
        isFetchingPrivate: false
      }
    default:
      return state
  }
}
