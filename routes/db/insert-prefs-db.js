
let db = require('./fs_pool.js');
const pool = db.getPool();


const insertPrefs = async (_category) => {
    console.log('insertPrefs _category = ', _category)

    const update = async () => {
        
        let newPrefs = []
        await createProcon(newPrefs, _category.pros, _category.cons)

        pool.connect(async (err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            let oldPrefs = [], writePrefs = []
            
           Results = await client.query({
            rowMode:'array',
            text: 'SELECT pref, procon FROM preference WHERE cat_id=$1;'},[_category.id])
            let rows = Results.rows
            oldPrefs = rows.map((row, i) => {
                return {pref: row[0],procon: row[1]} })
           
            // setTimeout(() => {100})
            writePrefs = await getMissingValues(newPrefs, oldPrefs)
            setTimeout(() => {500})
            const deletePrefs = await getMissingValues(oldPrefs, newPrefs)
           
           console.log('writePrefs = ', await writePrefs)
            let values = await writePrefs.map((pc) => {
                [_category.id, pc.pref, pc.procon]
                client.query('INSERT INTO preference(cat_id,pref,procon) VALUES($1,$2,$3)', [_category.id, pc.pref, pc.procon])
                // async (err, result) => {
                //     await res.status(200).json({ msg: "Category updated", _category });
                //     release();
                //     if (err) {
                //         return console.error('Error executing query', err.stack)
                //     }
                // }
            })
            console.log('deletePrefs = ',await deletePrefs)
            
            values = await deletePrefs.map((dc) => {
                [_category.id, dc.pref, dc.procon]
                client.query('DELETE FROM preference WHERE cat_id=$1 AND pref=$2 AND procon=$3', [_category.id, dc.pref, dc.procon])//}
                async (err, result) => {
                    await res.status(200).json({ msg: "Category updated", _category });
                    release();
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                }
            }
            )
        
    })
}
    await update();
}

const getMissingValues = async (arr1, arr2) => {
    return arr1.filter(({ pref: value, procon: bool }) => !arr2.some(obj => obj.pref === value && obj.procon === bool));
};
const createProcon = async (_procons, pros, cons) => {
    for (let i = 0; i < pros.length; i++) {
        if (pros[i].length > 0) {
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
module.exports.getMissingValues = getMissingValues;
module.exports.insertPrefs = insertPrefs;