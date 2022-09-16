const {pool} = require("./fs_pool");

async function retrieveCat(){
    try{
        const res = await pool.query(
            "SELECT * FROM category"
        );
        console.log('retrieve ',res.rows)
    }
    catch(error){
        console.error(error)
    }
}
module.exports = retrieveCat;