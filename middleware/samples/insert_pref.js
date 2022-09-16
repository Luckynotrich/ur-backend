const { pool } = require("./fs_pool");

async function insertPref(catID, revID, Pref, procon) {
    try {
        const res = await pool.query(
            "INSERT INTO preference (cat_id,rev_id,pref,procon) VALUES ($1,$2,$3,$4) RETURNING id",
            [catID, revID, Pref, procon]
        );
        console.log(`Added category with the id ${res.rows[0].id}`);
        return res.rows[0].id;
    } catch (error) {
        console.error(error);
    }
}
module.exports = insertPref;
