let db = require('./fs_pool.js');
const pool = db.getPool();


pool.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })


// my_query = client.query(
//     "SELECT TIMESTAMP, id category ORDER BY TIMESTAMP DESC  LIMIT 1");

//****************************************************************************************************************************************** */
//****************************************************************************************************************************************** */

// const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
// const values = ['brianc', 'brian.m.carlson@gmail.com']

// // callback
// client.query(text, values, (err, res) => {
//     if (err) {
//         console.log(err.stack)
//     } else {
//         console.log(res.rows[0])
//         // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//     }
// })

// // promise
// client
//     .query(text, values)
//     .then(res => {
//         console.log(res.rows[0])
//         // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//     })
//     .catch(e => console.error(e.stack))

// // async/await
// try {
//     const res = await client.query(text, values)
//     console.log(res.rows[0])
//     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
// } catch (err) {
//     console.log(err.stack)
// }