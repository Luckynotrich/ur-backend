
// const open = require('open')
// const https = require('https')
const fs = require('fs');
const express = require('express')
const path = require('path')
const cors = require('cors')
const date = require('date-and-time');
const apndFile = require('../utils/apnd-file.js');
require('dotenv').config({debug: true})
const PORT = process.env.PORT || 8081
const logger = require('./middleware/logger.js')

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
app.use('/api/category-api', require('./routes/api/category-api.js'))
app.use('/api/preference-api', require('./routes/api/preference-api.js'))
app.use('/api/review-api', require('./routes/api/review-api.js'))
app.use('/dist/', express.static(path.join(__dirname, '../','upon-review','build','dist')))
app.use('/_snowpack/', express.static(path.join(__dirname, '../','upon-review','build','_snowpack')))


app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '../','upon-review','build','index.html'))
});

// start the server
/* https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
}, app) */
app.listen(
  PORT,
  console.log(`Something gruesome is happening at http://localhost:${PORT}`)
);
// (async () => { await open(process.env.SERVER + PORT + '/', { app: { name: 'google-chrome' } }) })()
