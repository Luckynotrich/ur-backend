(async function () {

  let { pool } = require('./fs_pool')
  const { Pool } = require('pg');
  pool = new Pool(pool)

  getAllCats = async (_setCats, userId) => {
    return new Promise(resolve => {


      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        console.log('userId = ', userId, 'InSide CAT-DB-servises')
        client.query('SELECT category.id , cat_name, preference.id AS prefId, pref, procon FROM category LEFT JOIN preference ON category.id=preference.cat_id  WHERE userId = $1 ORDER BY cat_name', [userId], async (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          setTimeout(() =>
          resolve(),1)
          let cats = await result.rows
          
          processCats(_setCats, cats)
        })
      });
    })
  }

//convert db rows to category objects
  let processCats = (_setCats, cats) => {
    let cat = createCat(cats[0])
    for (i = 0; i < cats.length; i++) {
      
      if (cats[i].cat_name !== cat.name) {
        _setCats.current = cat
        delete cat
        cat = createCat(cats[i])
      }
      let pref = {value: cats[i].pref, id:cats[i].prefid}
      
      cats[i].procon ? cat.pros.push(pref): cat.cons.push(pref)
    }
    _setCats.current = cat
  }


  const createCat = (pref) => {
    
      return this.cat = {
        name: pref.cat_name,
        id: pref.id,
        pros: [],
        cons: [],
      }
  }

  const _setCats = {
    set current(category) {
      this.cats.push(category);
     
    },
    cats: []
  }



  await getAllCats(_setCats, '11d6af03-20ac-4f04-a21c-28ec418a2c18');
  for(let i = 0;i < _setCats.cats.length;i++){
  console.log("outside  ", _setCats.cats[i]);
}
})();
module.exports = getAllCats;