export function showAddItemModal(itemLocation) {
    return {
        type: 'ADD_ITEM_MODAL',
        itemLocation
    }
}

export function hideModal() {
    return {
        type: 'HIDE_MODAL'
    }
}