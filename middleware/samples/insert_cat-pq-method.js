const {pool} = require('./fs_pool');
const viewerID = require('./default_uuid')

async function insertCat(name,pros,cons){
    let id 
    try{
    const res = await pool.query(
        "INSERT INTO category (viewerid,cat_name) VALUES ($1,$2) RETURNING id",
        [viewerID,name]
    );
    console.log(`Added category with the id ${res.rows[0].id}`)
    id = res.rows[0].id;
   
}
catch(error){
    console.error(error)
}
return id;
}
module.exports = insertCat;