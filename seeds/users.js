const { hashSync } = require('bcrypt')
const saltRounds = 10

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          user_name: 'SophieJoy',
          hash: hashSync('123', saltRounds),
          email: "sophiescottmaunder@gmail.com",
          first_name: 'Sophie',
          last_name: 'Scott-Maunder'
        }
      ])
    })
}
