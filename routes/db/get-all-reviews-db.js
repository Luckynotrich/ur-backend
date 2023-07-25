
// var format = require('pg-format')
let db = require('./fs_pool.js');
const pool = db.getPool();


module.exports = getAllReviews = async (setReview, userId) => {
    return new Promise(resolve => {

        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            client.query(' SELECT r.id, r.cat_id, rev_url, rev_date, rating, rev_text, c.pref_id, p.procon'
                + ' AS procon'
                + ' FROM review r'
                + ' LEFT JOIN checked c ON c.rev_id = r.id'
                + ' LEFT JOIN preference p ON c.pref_id = p.id'
                + ' LEFT JOIN category ON category.id = r.cat_id' 
                + ' WHERE category.userId = $1 ORDER BY r.cat_id;', [userId],
                async (err, result) => {
                    release()
                    if (err) {
                        return console.error('Error executing query :-(', err.stack)
                    }
                    setTimeout(() =>
                        resolve(), 100)

                    let reviews = await result.rows
                    if (reviews.length > 0) processReview(setReview, reviews)
                })
        });
    })
}


//convert db rows to review objects
const processReview = (_setReview, reviews) => {
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
