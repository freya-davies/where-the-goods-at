import request from 'superagent'


const addItemUrl = '/api/v1/items/add'
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const endUrl = '&key=' + process.env.GOOGLE_KEY 


export function addItem(item) {
    getCoordinates(item.address)
        .then(res => {
            // console.log(res.body)
            item.lat = res.body.results[0].geometry.location.lat
            item.long = res.body.results[0].geometry.location.lng
            delete item.address
            // console.log(item)
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

const url = '/api/v1/items/'


// | Get | /api/v1/items | No | Get all publicly available items from db | An Array of items |


export function getPublicItems () {
    
    return request
    .get(url)
    .then(res => res.body)
}

// | Get | /api/v1/items/user | Yes | Get all private items for specific user from db | An Array of items |

export function getPrivateItems() {
  return request
  .get(url + user)
  .then(res => res.body)

}

// | Post | /api/v1/items/add | Yes | Add a new item to db | The item that has been save in db read format |
// | Patch | /api/v1/items/update | Yes | Edit an existing item in db | Item has been updated in db |
// | Del | /api/v1/items/delete | Yes | Remove an item that belongs to this user | Item has been removed from db |
