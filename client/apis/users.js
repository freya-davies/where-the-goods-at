import request from 'superagent'

const url = '/api/users'

export function getUsers() {
  return request.get(url)
  .them(res => res.body)
}


