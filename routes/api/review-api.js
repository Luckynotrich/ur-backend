const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()
const insertReview = require('../db/insert-review-db')
const getAllReviews = require('../db/get-all-reviews-db')
let db = require('./fs_pool.js');
const pool = db.getPool();

let reviews = []

router.use(express.urlencoded({ extended: false }))

// Gets all records
router.get('/:userId', (req, res) => {
  let userId = req.params.userId;

  try {
    setReviews.reviews = []
    getAllReviews(setReviews, userId)
    reviews = setReviews.reviews
    setTimeout(() => 1000)

    res.send(reviews)
  }

  catch (err) {
    console.log(err)
    console.error(`Could not get reviews: ${err}`);
  }
});
const setReviews = {
  set current(review) {
    this.reviews.push(review);
  }
}

// get single member
router.get('/getone/:id', (req, res) => {
  const found = reviews.some(
    (review) => review.id === parseInt(req.params.id)
  )
  if (found) {
    res.json(
      reviews.filter((review) => review.id === parseInt(req.params.id))
    )
  } else {
    res.status(400).json({ msg: `Review ${req.params.id} not found` })
  }
})
 
// add new review to array
router.post('/addNew/', async (req, res) => {
  let form = new multiparty.Form();
  let ;
  let newReview = {catId, revName, revURL, revDate, revRating, reviewText, revPrefs:[]};
  await form.parse(req,async (err, fields) => {
    await Object,keys(fields).forEach((value) => {
    if(fields[value] && fields[value].toString().trim() !== ''){
      switch (value) {
        case 'catId':
          newReview.catId = fields[value][0]
          break;
        case 'revName':
          newReview.revName = fields[value][0]
          break;
        case 'revURL':
          newReview.revURL = fields[value][0]
          break;
        case 'revDate':
          newReview.revDate = fields[value][0]
          break;
        case 'revRating':
          newReview.revRating = fields[value][0]
          break;
        case 'reviewText':
          newReview.reviewText = fields[value][0]
          break;
        case 'propArray':
          newReview.revPrefs = fields[value]
          break;
        default:
          break;
      }
    }})
  })
  if (!newReview.catId) {
    return res.status(400).json({ msg: 'Category must be included' })
  }
  
  if (!newReview.revName) {
    return res.status(400).json({ msg: 'Name must be included' })
  }
  let revId
  pool.connect((err, client, release) => {
      if (err) {
          return console.error('Error acquiring client', err.stack)
      }
      client.query('INSERT INTO review(cat_id, rev_name, rev_url, rev_date, rating, rev_text) '
          + ' values($1, $2, $3, $4, $5, $6)'
          + ' returning id;', [newReview.catId, newReview.revName, newReview.revURL, newReview.revDate, newReview.revRating, newReview.revText],
          async (err, result) => {
            revId = await result.rows[0].id
              
              /* let values =  */
              await newReview.revPrefs.map((pref/* ,i */) => {
                  [revId/* , i */]
                 let id = client.query('INSERT INTO checked(rev_id,pref_id) VALUES($1,$2)'
                  +' returning id', [revId/* , i */])
                  pref.id = id;
              })

              release()
              if (err) {
                  return console.error('Error executing query', err.stack)
              }
          })


  })
  newReview.id = revId;
  reviews.push(newReview)
  res.json(newReview)
  // insertReview(newReview)
})

// update single member
router.put('/:id', (req, res) => {
  const found = reviews.some(
    (review) => review.id === parseInt(req.params.id)
  )
  if (found) {
    const updReview = req.body
    reviews.forEach((review) => {
      if (review.id === parseInt(req.params.id)) {
        review.name = updReview.name ? updReview.name : review.name
        review.url = updReview.url ? updReview.url : review.url
        review.date = updReview.date ? updReview.date : review.date
        review.rating = updReview.rating ? updReview.rating : review.rating
        review.text = updReview.text ? updReview.text :review.text
        review.prefs.forEach((pref) => {
          if (review.pref !== updReview.pref)
          // eslint-disable-next-line curly
          review.pref = updReview.pref ? updReview.pref : review.pref
        })
        
        res.json({ msg: 'Category updated', category })
      }
    })
  } else {
    res.status(400).json({ msg: `Review ${req.params.id} not found` })
  }})
  //delete a member
  router.delete('/:id', (req,res)=>{
    const found = reviews.some(review => review.id === parseInt(req.params.id))
    if (found) {
      res.json({msg:'Review deleted', reviews: reviews.filter(
        review => review.id !== parseInt(req.params.id)
        )})}
        else{
          res.status(400).json({msg:`No Review with the id of ${req.params.id} was found`})
        }
    
  })

  async function writeReviewFile (review) {
    const filePath = path.resolve(__dirname, '../../data/revFile.js')
  const fileData = 'const reviews =' + JSON.stringify(reviews, null,'\t') + '\n module.exports = reviews'
  
    try {
      const data = await fs.writeFile(filePath, fileData, () => (console.log(data)))
    } catch (error) { console.log(error) }
  }
module.exports = router
