const { pool } = require ("./db")


async function modify_data(){
    const [id,name] = process.argv.slice(2);
    try{
        const res = await pool.query(
            "UPDATE shark SET name = $1 WHERE id = $2",
            [name,id]);
            console.log(`Updated shark SET name to ${name}`)
            
    }catch(error){
        console.error(error)
    }
}
modify_data()