const open = require('open')
const express = require('express')
const path = require('path')
const cors = require('cors')
const date = require('date-and-time');
const apndFile = require('../utils/apnd-file.js');
require('dotenv').config({debug: true})
const PORT = process.env.PORT || 8081
const logger = require('./middleware/logger.js')
const { request } = require('http')

const app = express()
app.use(cors())
app.use('/favicon.ico', express.static('./favicon.ico'))
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  const now = new Date();
  let idData = date.format(now, 'YYYY/MM/DD HH:mm:ss');
let reqPath = `\n${idData} path: ${req.path} \n`;
  
  apndFile('log_app.log',reqPath);
  
  errorPath = req.path;
  next() // calling next middleware function or handler
})
// Category api routes
app.use('/api/category-api', require('./routes/api/category-api'))
app.use('/api/review-api', require('./routes/api/review-api'))

// express.static(root, [options])
// app.use(express.static(path.join(__dirname, '../','upon-review','build')))
// app.use(express.static(path.join(__dirname,'../','create-cat','dist')))
// app.use(express.static(path.join(__dirname,'../','review-creator','build')))

// app.get('/*', (req,res) => {
//   res.sendFile(path.join(__dirname, '../','upon-review','build','index.html'))
// });

// app.get('/create-cat', (req, res) => {
//   res.sendFile(path.join(__dirname, '../','create-cat','dist','index.html'));
// });

// app.get('/review-creator', (req, res) => {
//   res.sendFile(path.join(__dirname, '../','review-creator','build','index.html'))
// })





// start the server
app.listen(
  PORT,
  console.log(`Something gruesome is happening at http://localhost:${PORT}`)
);
// (async () => { await open(process.env.SERVER + PORT + '/', { app: { name: 'google-chrome' } }) })()
