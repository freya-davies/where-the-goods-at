import { getPublicItems, getPrivateItems, updateItem } from '../apis/items'

export function fetchPublicItems () {
  
    return (dispatch) => {
        dispatch({
            type: 'FETCH_PUBLIC_ITEMS'
        })
        getPublicItems()
        .then(items => {
            dispatch({
                type: 'RECEIVE_PUBLIC_ITEMS',
                items
            })
        })
      }
}

export function fetchPrivateItems (user) {
    return (dispatch) => {
        dispatch({
            type: 'FETCH_PRIVATE_ITEMS'
        })
        getPrivateItems(user)
            .then(items => {
                dispatch({
                    type: 'RECEIVE_PRIVATE_ITEMS',
                    items
                })
            })
    }
}

export function updateSingleItem(id, item) {
    return (dispatch) => {
        updateItem(id, item)
        .then(i => {
            dispatch({
                type: 'UPDATE_ITEM',
                id
            })
        })
    }
}