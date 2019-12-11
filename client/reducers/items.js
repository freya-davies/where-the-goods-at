
const initialState = {items: []}

export default function items (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_PUBLIC_ITEMS':
      return {items: action.items}
    default: 
      return state
  }
}
