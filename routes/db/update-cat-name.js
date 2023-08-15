let db = require('./fs_pool.js');
const pool = db.getPool();


updateCatName = async (_category) => {
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
 client.query('UPDATE category SET cat_name = $1 WHERE id = $2', [_category.name, category.id],
      async (err, result) => {
        await res.status(200).json({ msg: "Category updated", _category });
        release();
        if (err) {
          return console.error('Error executing query', err.stack)
        }
      })})
}
module.exports = updateCatName;