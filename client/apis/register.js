import request from 'superagent' 


export function checkDatabase(email) {
  email = email.toLowerCase()
  
  return request 
  .get('/api/checkEmail/' + email)
  .then( res => res.body.result)
}

