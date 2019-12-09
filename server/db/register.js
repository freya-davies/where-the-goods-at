const connection = require('./connection')


function doesEmailExist (givenEmail, db = connection) {
  return db('users')
    .where('email', givenEmail)
}


module.exports = {
  doesEmailExist
}
