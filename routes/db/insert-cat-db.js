//var format = require('pg-format')
    let { pool } = require('./fs_pool')
    const { Pool } = require('pg');
    pool = new Pool(pool)

    insertCat= async (_category) => {
        let id
        let procons = []
        createProcon(procons,_category.pros,_category.cons)
        
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            client.query('INSERT INTO category(userid, cat_name) '
                + ' values($1, $2)'
                + ' returning id;', [_category.userId, _category.name],
                async (err, result) => {
                    id = await result.rows[0].id
                    
                    let values = await _category.procons.map((i) => {
                        [id, i]
                        client.query('INSERT INTO prefernce(cat_id,pref_id,procon) VALUES($1,$2,$3)', [id, procons[i].pref, procons[i].procon])
                    })

                    release()
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                })


        })
    }
const createProcon = (_procons, pros, cons) => {
    for(let i = 0;i < pros.length;i++){
        let pref = {pref: pros[i],procon: 't'}
        _procons.push(pref)
    }
    for(let i = 0;i < cons.length;i++){
        let pref = {pref: cons[i],procon: 'f'}
        _procons.push(pref)
    }

}


module.exports = insertReview;