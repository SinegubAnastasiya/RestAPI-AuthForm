const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: '5432',
  password: 'kitten1998',
  user: 'postgres',
  database: 'authForm',
});

module.exports = pool;
