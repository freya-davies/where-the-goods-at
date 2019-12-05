import request from 'superagent'

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