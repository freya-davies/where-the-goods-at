import request from 'superagent'
import { getKey } from './auth'
import { findSuburb } from '../apis/itemList'

const url = '/api/v1/items/'

const addItemUrl = '/api/v1/items/add'
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const endUrl = '&key='


export function addItem(item) {
    if (item.lat && item.long) {
        findSuburb(item.lat, item.long)
            .then(suburb => {
                item.suburb = suburb
                return request
                    .post(addItemUrl)
                    .send(item)
                    .then(res => res.statusCode)
            })
    } else {
       return getCoordinates(item.address)
            .then(res => {
                item.lat = res.body.results[0].geometry.location.lat
                item.long = res.body.results[0].geometry.location.lng
                delete item.address
                    return request
                    .post(addItemUrl)
                    .send(item)
                    .then(res => res.statusCode)
                })
            }
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

export function getPublicItems() {

    return request
        .get(url)
        .then(res => res.body)
}


export function getPrivateItems(user) {
    return request
        .get(url + `user/${user}`)
        .then(res => res.body)

}

export function getCategories() {
    return request
        .get(url + 'categories')
        .then(res => res.body)
}

export function getSeasons() {
    return request
        .get(url + 'seasons')
        .then(res => res.body)
}