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

export function updateItemModal(item) {
    return {
        type: 'UPDATE_ITEM_MODAL',
        item
    }
}

export function showAddItemByAddressModal() {
    return {
        type: 'ADD_ITEM_BY_ADDRESS_MODAL',
    }
}