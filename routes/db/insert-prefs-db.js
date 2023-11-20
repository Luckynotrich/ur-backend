
let db = require('./fs_pool.js');
const pool = db.getPool();


insertPrefs = async (_category) => {

    const update = async () => {
        console.log('inside insertPref _category = ', _category)
        if (_category.pros.length > 0 || _category.cons.length > 0) {
            let procons = []
            await createProcon(procons, _category.pros, _category.cons)

            pool.connect(async (err, client, release) => {
                if (err) {
                    return console.error('Error acquiring client', err.stack)
                }
                const clearOld = async () => { client.query('DELETE FROM preference WHERE cat_id=$1', [_category.id]) }
                await clearOld();
                let values = await procons.map((pc) => {
                    [_category.id, pc.pref, pc.procon]
                    client.query('INSERT INTO preference(cat_id,pref,procon) VALUES($1,$2,$3)', [_category.id, pc.pref, pc.procon])//}
                    async (err, result) => {
                        await res.status(200).json({ msg: "Category updated", _category });
                        release();
                        if (err) {
                            return console.error('Error executing query', err.stack)
                        }
                    }
                })
            }
            )
        } 
    }
    await update();
}
const createProcon = (_procons, pros, cons) => {
    for (let i = 0; i < pros.length; i++) {
        if (pros[i].length > 0) {
            //let preference = { pref: pros[i], procon: 't' }
            _procons.push({ pref: pros[i], procon: 't' })
        }
        else console.log("Empty pro ", pros[i])
    }

    for (let i = 0; i < cons.length; i++) {
        if (cons[i].length > 0) {
            _procons.push({ pref: cons[i], procon: 'f' })
        }
        else console.log("Empty con ", cons[i])
    }

}


module.exports = insertPrefs;