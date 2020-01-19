const knexConfig = require('../knexfile')[process.env.ENV];
module.exports = require('knex')(knexConfig)
