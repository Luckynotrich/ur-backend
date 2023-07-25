
let db = require('./fs_pool.js');
const pool = db.getPool();


module.exports = getAllCats = async (setCats, userId) => {
  
  return new Promise(resolve => {
    
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query('SELECT category.id , cat_name, preference.id AS prefId, pref, procon'
        + ' FROM category'
        +' LEFT JOIN preference ON category.id=preference.cat_id'
        + ' WHERE EXISTS (SELECT category.id FROM category'
        + ' WHERE category.userId = $1)'
        + ' AND category.userId = $1'
        + ' ORDER BY cat_name', [userId],
        async (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query :-(', err.stack)
          }
          setTimeout(() =>
            resolve(), 200)

          let cats = await result.rows
         if(cats.length > 0) processCats(setCats, cats)
        })
    });
  })
}


//convert db rows to category objects
const processCats = (_setCats, cats) => {
  let cat = catObj(cats[0])
  for (i = 0; i < cats.length; i++) {

    if (cats[i].cat_name !== cat.name) {
      _setCats.current = cat
      delete cat
      cat = catObj(cats[i])
    }

    let pref = { value: cats[i].pref, id: cats[i].prefid }
    cats[i].procon ? cat.pros.push(pref) : cat.cons.push(pref)
  }
  _setCats.current = cat
}

const catObj = (pref) => {
    
  return this.cat = {
    name: pref.cat_name,
    id: pref.id,
    pros: [],
    cons: [],
  }
}
//module.exports = insertCat = async () => { }





