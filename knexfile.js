// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'postgresql',
  //   connection: 'postgres://ynmpbsdbckncpv:25ca59e19d0f85215048ec3d1ced9133d324bd2e20101fc4f6e8c17af420f54b@ec2-107-22-195-114.compute-1.amazonaws.com:5432/dfes7hv2crqu95?ssl=true',
  //   useNullAsDefault: true
  // },//revert to original?
  development: {
      client: 'sqlite3',
      connection: {
        filename: './dev.sqlite3'
      },
      useNullAsDefault: true
    },

  test: {
       client: 'sqlite3',
       connection: {
         filename: ':memory:'
       },
       useNullAsDefault: true
     },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
