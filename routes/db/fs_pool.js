const {Pool} = require('pg');
let pool;
const config = {
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    host: process.env.DBHOST,
    max: 10,
    idleTimeoutMillis: 30000,
};
//module.exports = {pool};
module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new Pool(config);
      return pool;
},
}