const open = require('open')
const express = require('express')
const path = require('path')
require('dotenv').config({debug: true})

const logger = require('./middleware/logger.js')
const { request } = require('http')

const app = express()
const PORT = process.env.PORT || 8080

app.use('/favicon.ico', express.static('./favicon.ico'))

app.use(logger)
//app.use(responder)

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// express.static(root, [options])
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname,'create-cat','dist')))
app.use(express.static(path.join(__dirname,'review-creator','build')))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'build','index.html'))
});

app.get('/create-cat', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-cat','dist', 'index.html'));
});

app.get('/review-creator', (req, res) => {
  res.sendFile(path.join(__dirname, 'review-creator','build','index.html'))
})

// Category api routes
app.use('/api/categories', require('./routes/api/categories'))
app.use('/api/catDb', require('./routes/api/cat-db-api'))



// start the server
app.listen(
  PORT,
  console.log(`Something gruesome is happening at http://localhost:${PORT}`)
);

(async () => { await open(process.env.SERVER + PORT + '/', { app: { name: 'google-chrome' } }) })()
