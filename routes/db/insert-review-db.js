var format = require('pg-format')
    let { pool } = require('./fs_pool')
    const { Pool } = require('pg');
    pool = new Pool(pool)
    
    insertReview = async (_review) => {
        let id
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            client.query('INSERT INTO review(cat_id, rev_name, rev_url, rev_date, rating, rev_text) '
                + ' values($1, $2, $3, $4, $5, $6)'
                + ' returning id;', [_review.catId, _review.revName, _review.revURL, _review.revDate, _review.revRating, _review.revText],
                async (err, result) => {
                    id = await result.rows[0].id
                    
                    let values = await _review.revPrefs.map((i) => {
                        [id, i]
                        client.query('INSERT INTO checked(rev_id,pref_id) VALUES($1,$2)', [id, i])
                    })

                    release()
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                })


        })
    }


//module.exports = getAllReviews;
module.exports = insertReview;