const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()
const insertReview = require('../db/review-db-service')

let reviews = []

router.use(express.urlencoded({ extended: false }))

// Gets all records
router.get('/', (req, res) => res.json(reviews))

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
router.post('/addNew/', (req, res) => {
  const newReview = {
    catId: req.body.catId,
    revName: req.body.revName,
    revURL: req.body.revURL,
    revDate: req.body.revDate,
    revRating: req.body.revRating,
    revText: req.body.revTxt,
    revPrefs: req.body.propArray,

  }
  console.log('newReview.catId ',newReview.catId, ' newReview.revName ',newReview.revName, ' newReview.revURL',newReview.revURL, ' newReview.revDate',newReview.revDate, ' newReview.revRating',newReview.revRating, ' newReview.reviewText ',newReview.reviewText,' newReview.revPrefs ',newReview.revPrefs )
  if (!newReview.revName) {
    return res.status((400).json({ msg: 'Name must be included' }))
  }
  reviews.push(newReview)
  res.json(reviews)
  insertReview(newReview)
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
