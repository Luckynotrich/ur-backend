const express = require('express')
const Router = require('express-promise-router')
const app = express()

const db = require('../db')

const router = new Router()
module.exports = router;
//GET all categories
router.get('/getCats/:userId', async (request, response) => {
    const userId = request.params.userId
   console.log("userId = ", userId)
    await db.query('SELECT  cat_name FROM category WHERE userId = $1;', [userId], (err, result) => {
        if (err) {
          return next(err)
        }
        response.send(result.rows)
    })
    
});

router.get('/getPrefs/:catId', async (request, response) => {
  const catId = request.params.catId
 console.log("catId = ", catId)
  await db.query('SELECT id, pref FROM preference WHERE cat_Id = $1;', [catId], (err, result) => {
      if (err) {
        return next(err)
      }
      response.send(result.rows)
  })
  
});