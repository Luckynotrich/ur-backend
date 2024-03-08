let db = require('./fs_pool.js');
const pool = db.getPool();
const insertChecked = async (newReview) => {
    const insert = async ()
pool.conne(async (err, client, release) => {
if (err) {return console.error('Error acquiring client', err.stack)}

    await newReview.revPrefs.forEach((pref, i) => {
        [revId, i]
        let id = client.query('INSERT INTO checked(rev_id,pref_id) VALUES($1,$2)'
            + ' returning id', [revId, pref])
        pref.id = id;
    })
    await release()
    if (err) {return console.error('Error executing insertChecked query', err.stack)}
})
await insert()
}
module.exports = { insertChecked }