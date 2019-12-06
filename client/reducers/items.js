
const initialState = {
  items: [],
  isFetching: false
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
    default:
      return state
  }
}
