(async function () {
    var format = require('pg-format')
    let { pool } = require('./fs_pool')
    const { Pool } = require('pg');
    pool = new Pool(pool)

    getAllReviews = async (setCats, userId) => {
        return new Promise(resolve => {

            pool.connect((err, client, release) => {
                if (err) {
                    return console.error('Error acquiring client', err.stack)
                }
                client.query(/* 'SELECT category.id , cat_name, preference.id AS prefId, pref, procon'
            +' FROM category LEFT JOIN preference ON category.id=preference.cat_id'
            +' WHERE userId = $1 ORDER BY cat_name', [userId],  */
                    async (err, result) => {
                        release()
                        if (err) {
                            return console.error('Error executing query', err.stack)
                        }
                        setTimeout(() =>
                            resolve(), 1)

                        let reviews = await result.rows
                        processReview(setReview, reviews)
                    })
            });
        })
    }


    //convert db rows to review objects
    const processReview = (setReview, reviews) => {
        let review = createReview(reviews[0])
        for (i = 0; i < reviews.length; i++) {

            if (reviews[i].review_name !== review.name) {
                _setReview.current = review
                delete review
                review = createReview(reviews[i])
            }
            let pref = { value: reviews[i].pref, id: reviews[i].prefid }

            reviews[i].procon ? review.pros.push(pref) : review.cons.push(pref)
        }
        _setReview.current = review
    }


    const createReview = (pref) => {

        return this.Review = {
            name: pref.review_name,
            id: pref.id,
            pros: [],
            cons: []
        }
    }


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

    //await getAllCats(setCats,'11d6af03-20ac-4f04-a21c-28ec418a2c18');
    //console.log("outside  ", setCats.cats);

})();

module.exports = getAllReviews;
module.exports = insertReview;