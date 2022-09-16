//This is actually the third iteration of the basic index.js
// so I guess since we are using const db = require('../db') in our request function
// node with select index.js
let { pool} = require('./fs_pool')
const { Pool } = require('pg')
pool = new Pool(pool)
module.exports = {
  query: (text, params, callback) => { //and use the query method
    const start = Date.now()
    return pool.query(text, params, (err, res) => {// use query text and parameters here to execute the query
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: res.rowCount })
      callback(err, res)     //if(err) or res.send happens here
    })
  },
  getClient: (callback) => {//           This was added to allow multiple queries to be executed and
    pool.connect((err, client, done) => {// I don't understand how it works
      callback(err, client, done)        //Could you explain how it works?
    })
  }
}