//var format = require('pg-format')
let { pool } = require('./fs_pool')
const { Pool } = require('pg');
pool = new Pool(pool)

insertCat = async (_category) => {
    
    let procons = []

    createProcon(procons, _category.pros, _category.cons)

    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query('INSERT INTO category(userid, cat_name) '
            + ' values($1, $2)'
            + ' returning id;', [_category.userId, _category.name],
            async (err, result) => {
                id = await result.rows[0].id
                if (procons.length > 0) {
                    let values = await procons.map((pc) => {
                        [id, pc.pref, pc.procon ]
                        client.query('INSERT INTO preference(cat_id,pref,procon) VALUES($1,$2,$3)', [id, pc.pref, pc.procon])
                        console.log(id, pc.pref)
                    })
                }
                release()
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
            })


    })
}
const createProcon = (_procons, pros, cons) => {
    console.log('pros ',pros)
     for (let i = 0; i < pros.length; i++) {
        if(pros[i].length > 0){
        let preference = { pref: pros[i], procon: 't' }
        console.log('preference pros ',preference)
        _procons.push(preference)}
        else console.log("pros out",pros[i])
    }

    for (let i = 0; i < cons.length; i++) {
        if(cons[i].length > 0){
        let preference = { pref: cons[i], procon: 'f' }
        console.log('preference cons ',preference)
        _procons.push(preference)}
        else console.log("cons out",cons[i])
    }

}


module.exports = insertCat;