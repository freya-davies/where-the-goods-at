import request from 'superagent'

const addItemUrl = '/api/v1/items/add'
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const endUrl = '&key=AIzaSyDlCzvqC9Bvt0MZ2JLsKtFQQdmRL9FmRO0'


export function addItem(item) {
    getCoordinates(item.address)
        .then(res => {
            item.lat = res.body.results[0].geometry.location.lat
            item.long = res.body.results[0].geometry.location.lng
            delete item.address

            return request
                .post(addItemUrl)
                .send(item)
                .then(response => response)
        })
    
}

function getCoordinates(address) {
    return request
    .get(baseUrl + address + endUrl)
}