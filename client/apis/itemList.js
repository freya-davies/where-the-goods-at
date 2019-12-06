import request from 'superagent'
import { getKey } from './auth'

const url = '/api/v1/itemList/'

const findSuburbUrl = '/api/v1/itemList/find'
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
const endUrl = '&key='


export function findSuburb(item) {
  const commar = ','

  getSuburb(item.lat, commar, item.long)
    .then(x => {
      // item.suburb =  
      console.log(x)
      return request
      // .post(addItemUrl)
      // .send(item)
      // .then(response => response)
    })
}

function getSuburb(lat, commar, long) {
  return getKey().then(() => {
    return request
      .get(baseUrl + lat + commar + long + endUrl + process.env.GOOGLE_MAPS)
      .then(data => data)
      .catch(error => {
        console.log(error)
      })
  })
}


