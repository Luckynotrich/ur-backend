let db = require('./fs_pool.js');
const pool = db.getPool();


module.exports = GetCount = async (table, column, id) => {
    return new Promise(resolve => {

        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            client.query('SELECT COUNT($2) FROM $1 WHERE $2 = $1;', [table, column, id],
                async (err, result) => {
                    release()
                    if (err) {
                        return console.error('Error executing query :-(', err.stack)
                    }
                    setTimeout(() =>
                        resolve(), 200)
                    console.log(result.rows)
                })
        });
    })
}
// GetCount('category', 'userId', '92285056-ac27-4e03-a719-e19c36d87ae2')