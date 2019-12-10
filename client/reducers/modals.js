const initialState = {
    currentModal: '',
    item: null,
    itemLocation: null
}

export default function modals(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM_MODAL':
            return {
                currentModal: action.type,
                itemLocation: action.itemLocation
            }
        case 'HIDE_MODAL':
            return {
                currentModal: null
            }
        case 'UPDATE_ITEM_MODAL':
            return {
                currentModal: action.type,
                item: action.item
            }
            case 'ADD_ITEM_BY_ADDRESS_MODAL':
                return {
                    currentModal: action.type
                }
        default:
            return state
    }
}
