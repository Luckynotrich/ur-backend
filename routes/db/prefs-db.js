
let db = require('./fs_pool.js');
const pool = db.getPool();


const updatePrefs = async (_category) => {
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
            text: 'SELECT pref, procon, id FROM preference WHERE cat_id=$1;'},[_category.id])
            let rows = Results.rows
            oldPrefs = rows.map((row) => {
                return {pref: row[0],procon: row[1]} })
           oldPrefs.map((op) => {op.procon?op.procon='t':op.procon='f'})

           let oldPrefIds = rows.map((row) => {return {pref:row[0], id:row[2]}}) 
           
            writePrefs = await filterArray(newPrefs, oldPrefs)
            
            const deletePrefs = await filterArray(oldPrefs, newPrefs)
            
           const deleteChecked = await oldPrefIds.filter(({pref: value, id: num}) => deletePrefs.some(obj => obj.pref === value));
           
        
        
            let values = await writePrefs.map((pc) => {
                [_category.id, pc.pref, pc.procon]
                client.query('INSERT INTO preference(cat_id,pref,procon) VALUES($1,$2,$3)', [_category.id, pc.pref, pc.procon])
                async (err, result) => {
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                }
            })
        
             values = await deleteChecked.map((dc) => {
                [dc.id]
                client.query('DELETE FROM checked WHERE pref_id=$1', [dc.id])
                async (err, result) => {
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                }
            })
            // values = await deletePrefs.map((dc) => {
                
            values = await deletePrefs.map((dc) => {
                [_category.id, dc.pref, dc.procon]
                client.query('DELETE FROM preference WHERE cat_id=$1 AND pref=$2 AND procon=$3', [_category.id, dc.pref, dc.procon])//}
                async (err, result) => {
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                }
            }
            )
        release();
        // return await values
    })
}
    await update();
    await res.status(200).json({ msg: "Category updated", _category });
}

const filterArray = async (arr1, arr2) => {
    return arr1.filter(({ pref: value, procon: bool}) => !arr2.some(obj => obj.pref === value && obj.procon === bool));
};
const createProcon = async (_procons, pros, cons) => {
    for (let i = 0; i < pros.length; i++) {
        if (pros[i].length > 0) {
            _procons.push({ pref: pros[i], procon: 't'})
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
module.exports.filterArray = filterArray;
module.exports.updatePrefs = updatePrefs;