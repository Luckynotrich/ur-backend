const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()
const multiparty = require('multiparty');

const { insertChecked } = require('../db/insert-checked-db')
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
  let revId = null, sent = false;
  let form = new multiparty.Form();
  let catId = '', revName = "", revURL = "", revDate = '', revRating = '', revText = '', revPrefs = [];
  let newReview = { catId, revName, revURL, revDate, revRating, revText, revPrefs: [] };

  await form.parse(req, async (err, fields) => {
    console.log('fields = ', fields)
    await Object.keys(fields).forEach(async (value) => {
      if (fields[value] && fields[value].toString().trim() !== '') {
        if (value.includes('catId')) {
          catId = Number(fields[value][0])
          if (!catId) {
            console.log('catId failed = ', catId)
            return res.status(400).json({ msg: 'Category must be included' })
          } else {
            newReview.catId = catId;
          }
        }
        else if (value.includes('revName')) {
          revName = fields[value][0]
          if (!revName) {
            console.log('revName failed = ', revName)
            return res.status(400).json({ msg: 'Name must be included' })
          } else {
            newReview.revName = revName;
          }
        }
        else if (value.includes('revURL'))
          newReview.revURL = fields[value][0]
        else if (value.includes('revDate'))
          newReview.revDate = fields[value][0]
        else if (value.includes('revRating'))
          newReview.revRating = Number(fields[value][0])
        else if (value.includes('revText'))
          newReview.revText = fields[value][0]
        else if (value.includes('propArray')) {
          if (fields[value][0] !== '0') {
            fields[value].forEach((prop, i) => {
              newReview.revPrefs.push(Number(fields[value][i]))
            })
          } else { newReview.revPrefs = [-1] }
          console.log('propArray newReview.revPrefs = ', newReview.revPrefs)
        }
      } else console.log('no match ' + value + ' ' + fields[value][0])
      // this conditional depends on the order of the fields in the form
      //if no preferences or preferences are present, ensures that else tree reaches propArray
      if (newReview.revPrefs[0] === -1 || newReview.revPrefs.length > 0) {
        pool.connect(async (err, client, release) => {
          if (err) {
            return console.error('Error acquiring client', err.stack)
          }                     //sent eliminates multiple inserts
          if (!sent) {
            sent = true,//client.query is inside of forEach(async(value) loop to prevent execution from jumping ahead of else tree
            client.query('INSERT INTO review(cat_id, rev_name, rev_url, rev_date, rating, rev_text) '
              + ' values($1, $2, $3, $4, $5, $6)'
              + ' returning id;', [newReview.catId, newReview.revName, newReview.revURL, newReview.revDate, newReview.revRating, newReview.revText],
              async (err, result) => {
                if (!err) {
                  revId = await result.rows[0].id
                  if (newReview.revPrefs[0] > -1) {
                    await newReview.revPrefs.map((pref, i) => {
                      [revId, i]
                      let id = client.query('INSERT INTO checked(rev_id,pref_id) VALUES($1,$2)'
                        + ' returning id', [revId, pref])
                      pref.id = id;
                    })
                  }
                }
                release()
                if (err) {
                  return console.error('Error executing review query', err.msg)
                }
              })

            newReview.id = await revId;
            await reviews.push(newReview)
            await res.status(200).json(newReview)
          }
        }, 500)
      }
    })

  })
})

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
// be set to delete on cascade
//This delete route requires checked foreign key for rev_id to 
router.delete('/delete/:id', (req, res) => {

  const found = reviews.some(review => review.id === parseInt(req.params.id))
  if (found) {
    const id = parseInt(req.params.id)
    console.log('id =', id)
    pool.connect((err, client, release) => {
      if (err) { return console.error('Error acquiring client', err.stack) }
      if (id) {
        client.query('DELETE FROM review as review WHERE review.id = $1', [id])
        res.json({
          msg: 'Review deleted', reviews: reviews.filter(
            review => review.id !== parseInt(req.params.id)
          )
        })
        release();
      }
      else {
        res.status(400).json({ msg: `No Review with the id of ${req.params.id} was found` })
      }
    })
  }
})
//delete a member
// router.delete('/delete/:id', async (req, res) => {
//   await Object.keys(fields).forEach((property) => {//async await must resolve
//     if (fields[property].toString().length > 0 &&
//       fields[property].toString() !== ' ') {
//         if(property.includes('id')){
//         res.json({
//           msg: 'Member deleted', members: members.filter(member =>
//             member.id !== parseInt(req.params.id))
//         });}
//         else {
//           res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//         }
//     }
//   })


// });

async function writeReviewFile(review) {
  const filePath = path.resolve(__dirname, '../../data/revFile.js')
  const fileData = 'const reviews =' + JSON.stringify(reviews, null, '\t') + '\n module.exports = reviews'

  try {
    const data = await fs.writeFile(filePath, fileData, () => (console.log(data)))
  } catch (error) { console.log(error) }
}
async function runDontWalk(Caller, count) {
  while (true) {
    console.log('Running...');
    await new Promise(resolve => setInterval(resolve, count));
    console.log(`${Caller}...sent`);
    return;
  }
}
module.exports = router
