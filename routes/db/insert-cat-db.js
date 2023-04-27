
let db = require('./fs_pool.js');
const pool = db.getPool();


insertCat = async (_category) => {
    
    let procons = []

    await createProcon(procons, _category.pros, _category.cons)

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
     for (let i = 0; i < pros.length; i++) {
        if(pros[i].length > 0){
        //let preference = { pref: pros[i], procon: 't' }
        _procons.push({ pref: pros[i], procon: 't' })}
        else console.log("Empty pro ",pros[i])
    }

    for (let i = 0; i < cons.length; i++) {
        if(cons[i].length > 0){
        _procons.push({ pref: cons[i], procon: 'f' })}
        else console.log("Empty con ",cons[i])
    }

}


module.exports = insertCat;