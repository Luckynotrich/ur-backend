const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()
const multiparty = require('multiparty');

const insertReview = require('../db/insert-review-db')
const getAllReviews = require('../db/get-all-reviews-db')
let db = require('../db/fs_pool.js');
const pool = db.getPool();

let reviews = []

router.use(express.urlencoded({ extended: false }))

// Gets all records
router.get('/:userId', async (req, res) => {
  let userId = req.params.userId;

  try {
    setReviews.reviews = []
    await getAllReviews(setReviews, userId)
    reviews = await setReviews.reviews
    setTimeout(() => 500)
    await res.send(reviews)
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

  let catId, revName, revURL, revDate, revRating, revText, revPrefs = [];
  let newReview = { catId, revName, revURL, revDate, revRating, revText, revPrefs: [] };

  await form.parse(req, async (err, fields) => {
    await Object.keys(fields).forEach((value) => {
      if (fields[value] && fields[value].toString().trim() !== '') {
          if (value.includes('propArray')) {
          value1 = "propArray";
        }
        else value1 = value;
        console.log('value1 = ', value1,' value = ', value, 'fields[value] = ', fields[value][0])
        switch (value1) {
          case 'catId':
            newReview.catId = Number(fields[value][0])
            //console.log('catId = ', newReview.catId, 'typeof = ', typeof newReview.catId)
            if (!newReview.catId) {
              console.log('catId failed = ', newReview.catId)
              return res.status(400).json({ msg: 'Category must be included' })
            }
            break;
          case 'revName':
            newReview.revName = fields[value][0]
            //console.log('revName = ', newReview.revName, 'typeof = ', typeof newReview.revName)
            if (!newReview.revName) {
              console.log('revName failed = ', newReview.revName)
              return res.status(400).json({ msg: 'Name must be included' })
            }
            break;
          case 'revURL':
            newReview.revURL = fields[value][0]
            break;
          case 'revDate':
            newReview.revDate = fields[value][0]
            break;
          case 'revRating':
            newReview.revRating = Number(fields[value][0])
            break;
          case 'revText':
            newReview.revText = fields[value][0]
            break;
          case 'propArray':
            newReview.revPrefs.push(Number(fields[value][0]))
            break;
          default:
            console.log('switch: no match ' + value + ' ' + fields[value][0])
            break;
        }
      } else console.log('no value for ' + value)
    })
  })

  let revId
  await pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('INSERT INTO review(cat_id, rev_name, rev_url, rev_date, rating, rev_text) '
      + ' values($1, $2, $3, $4, $5, $6)'
      + ' returning id;', [newReview.catId, newReview.revName, newReview.revURL, newReview.revDate, newReview.revRating, newReview.revText],
      async (err, result) => {
        if (!err) {
          revId = await result.rows[0].id
          /* let values =  */
          await newReview.revPrefs.map((pref, i) => {
            [revId, i]
            let id = client.query('INSERT INTO checked(rev_id,pref_id) VALUES($1,$2)'
              + ' returning id', [revId, pref])
            pref.id = id;
          })
        }
        release()
        if (err) {
          return console.error('Error executing review query', err.msg)
        }
      })


  })
  newReview.id = await revId;
  await reviews.push(newReview)
  await res.status(200).json(newReview)
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
        review.text = updReview.text ? updReview.text : review.text
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
  }
})
//delete a member
router.delete('/:id', (req, res) => {
  const found = reviews.some(review => review.id === parseInt(req.params.id))
  if (found) {
    res.json({
      msg: 'Review deleted', reviews: reviews.filter(
        review => review.id !== parseInt(req.params.id)
      )
    })
  }
  else {
    res.status(400).json({ msg: `No Review with the id of ${req.params.id} was found` })
  }

})

async function writeReviewFile(review) {
  const filePath = path.resolve(__dirname, '../../data/revFile.js')
  const fileData = 'const reviews =' + JSON.stringify(reviews, null, '\t') + '\n module.exports = reviews'

  try {
    const data = await fs.writeFile(filePath, fileData, () => (console.log(data)))
  } catch (error) { console.log(error) }
}
module.exports = router
