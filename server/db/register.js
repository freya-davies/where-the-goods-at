const connection = require('./connection')


function compareEmails (givenEmail, db = connection) {
  return db('users')
    .where('email', givenEmail)
}


module.exports = {
  compareEmails
}
