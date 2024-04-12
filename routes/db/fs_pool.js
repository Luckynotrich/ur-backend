const {Pool} = require('pg');
require("dotenv").config;
let pool;
const config = {
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    max: 10,
    idleTimeoutMillis: 30000,
};
module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new Pool(config);
      return pool;
},
}