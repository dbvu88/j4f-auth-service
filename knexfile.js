require('dotenv').config()

module.exports = {
  development: {
    client: process.env.PG_CLIENT,
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    tableName: 'migrations'
  }
};
