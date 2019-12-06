import request from 'superagent'
import { getKey } from './auth'

const url = '/api/v1/items/'

const addItemUrl = '/api/v1/items/add'
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const endUrl = '&key='


export function addItem(item) {
    console.log(item)
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

    return getKey().then(() => {
        return request
            .get(baseUrl + address + endUrl + process.env.GOOGLE_MAPS)
            .then(data => data)
            .catch(error => {
                console.log(error)
            })
    })
}

export function getPublicItems () {
    
    return request
    .get(url)
    .then(res => res.body)
}


export function getPrivateItems() {
  return request
  .get(url + user)
  .then(res => res.body)

}

