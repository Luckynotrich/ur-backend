
let db = require('./fs_pool.js');
const pool = db.getPool();


insertPref = async (_category) => {

    if (_category.pros.length > 0 || _category.cons.length > 0) {
        let procons = []
        await createProcon(procons, _category.pros, _category.cons)

        pool.connect(async (err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            let values = await procons.map((pc) => {
                [_category.id, pc.pref, pc.procon]
                if(!pc.id)client.query('INSERT INTO preference(cat_id,pref,procon) VALUES($1,$2,$3)', [_category.id, pc.pref, pc.procon])
                if(pc.id)client.query('UPDATE preference SET pref=$2, procon=$3 WHERE id=$1', [pc.id, pc.pref, pc.procon],
                async (err, result) => {
                    await res.status(200).json({ msg: "Category updated", _category });
                    release();
                    if (err) {
                      return console.error('Error executing query', err.stack)
                    }
                  })
            })
        }

        )
    }

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


module.exports = insertPref;