const {generatePasswordHash} = require('../auth/hash')

const connection = require('./connection')

function createUser (user_name, email, first_name, last_name, password, testDb) {
  const db = testDb || connection
  console.log('generatePasswordHash')
  return generatePasswordHash(password)
    .then(hash => { console.log('worked')
      return db('users').insert({user_name, email, first_name, last_name, hash})
    })
}

function userExists (user_name, testDb) {
  const db = testDb || connection

  return db('users')
    .where('user_name', user_name)
    .then(users => users.length > 0)
}

function getUserByUsername (user_name, testDb) {
  const db = testDb || connection
  console.log(user_name)
  return db('users')
    .where('user_name', user_name)
   .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByUsername
}
