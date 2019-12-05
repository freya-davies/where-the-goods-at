import {getPublicItems} from '../apis/items'

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