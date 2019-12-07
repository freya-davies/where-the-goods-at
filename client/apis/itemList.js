import request from 'superagent'
import { getKey } from './auth'

// const url = '/api/v1/itemList/'

// const findSuburbUrl = '/api/v1/itemList/find'
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
const endUrl = '&key='


export function findSuburb(lat, long) {
// wanna map through all items and then do the following
  return getSuburb(lat, long)
    .then(item => {
      // item.suburb =  
      // console.log(item.body.results[0].address_components[2])
      if(item.body.results[0].address_components .length == 7) {
        // console.log('hello')
        return item.body.results[0].address_components[2].long_name
      } else {
        return item.body.results[0].address_components[0].long_name
      }
    })
}

function getSuburb(lat, long) {
  return getKey().then(() => {
    // console.log(process.env.GOOGLE_MAPS)
    return request
      .get(baseUrl + lat + ',' + long + endUrl + process.env.GOOGLE_MAPS)
      .then(data => data)
      .catch(error => {
        console.log(error)
      })
  })
}

// item.body.results[0].address_components 
// if has .length = 7 then return 2
//else return [0].long_name
