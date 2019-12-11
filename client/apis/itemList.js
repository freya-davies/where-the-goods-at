import request from 'superagent'
import { getKey } from './auth'


const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
const endUrl = '&key='


export function findSuburb(lat, long) {
  return getSuburb(lat, long)
    .then(item => {
      console.log(item.body)
      if(item.body.results[0].address_components .length == 7) {
        return item.body.results[0].address_components[2].long_name
      } else {
        return item.body.results[0].address_components[0].long_name
      }
    })
}

function getSuburb(lat, long) {
  return getKey().then(() => {
    return request
      .get(baseUrl + lat + ',' + long + endUrl + process.env.GOOGLE_MAPS)
      .then(data => data)
      .catch(error => {
        console.log(error)
      })
  })
}

