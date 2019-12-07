const initialState = {
    currentModal: '',
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
        default:
            return state
    }
}
