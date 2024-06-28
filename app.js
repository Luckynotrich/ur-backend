const https = require('https')

const fs = require('fs');
const apndFile = require('../utils/apnd-file.js');
const express = require('express');
const path = require('path');
const cors = require('cors');
const date = require('date-and-time');
const logger = require('./middleware/logger.js');
require('dotenv').config({ debug: true });

const app = express();

const db = require('./routes/db/fs_pool.js');
const pool = db.getPool()

const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const initialize = require('./user-sessions/passport-config.js');
const passport = require("passport");
initialize(passport);

const flash = require('express-flash');
const bcrypt = require('bcrypt');

const allowedDomains = ["https://futureonreview.com","https://futureonreview.com/future-self","http://127.0.0.1:5173",];
app.use(cors({
  origin: allowedDomains,
  credentials: true
}));
app.use('/favicon.ico', express.static('./favicon.ico'));
app.use(logger);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.set("views", path.join(__dirname, "views"));
app.set('view engine', "ejs");

//****************************** logging ************** logging *************

app.use((req, res, next) => {
  const now = new Date();
  let idData = `\n${date.format(now, 'YYYY/MM/DD HH:mm:ss')}\n`;
  let reqPath = `\n${idData} path: ${req.path} \n`;
  apndFile('stderr.log', idData);
apndFile('log_app.log', reqPath);
  errorPath = req.path;
  next() // calling next middleware function or handler
})

//************************ express session ********* express session *************

app.use(expressSession({
  store: new pgSession({
    pool: pool,
    tableName: 'session'
    // Insert connect-pg-simple options here
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
cookie: {
    httpOnly: true,
    Secure: true,
    SameSite: 'None',
    path: ['/'],
    maxAge: 60 * 60 * 1000 * 5
  }
  // Insert connect-pg-simple options here
}))

app.use(passport.initialize());
app.use(passport.session());

//****************************************************** dist route ************ dist route

app.use((req, res, next) => {
  if (req.isAuthenticated) app.use(express.static(path.join(__dirname, './', 'dist')))
  next()
})

// ********************************************* assets & api routes *********assets & api routes ****

app.use(express.static(path.join(__dirname, './', 'dist/', 'assets/')));
app.use('/api/category-api', require('./routes/api/category-api.js'));
app.use('/api/preference-api', require('./routes/api/preference-api.js'));
app.use('/api/review-api', require('./routes/api/review-api.js'));

//************************************ get '/' ************** get '/' *******

app.get('/', async (req, res, next) => {
  logout(req, res, next);
  // if (await req.isAuthenticated) {
    // res.sendFile(path.join(__dirname, './dist/index.html'))
  // }
   res.render("pages/index")
});
//************************************** login *********** login ********

app.get('/login', checkAuthenticated, (req, res) => {
  res.render('login')
})

// ************************************* future-self ******* future-self *******

app.get('/future-self', (req, res) => {

if (req.isAuthenticated) {
    res.sendFile(path.join(__dirname, './dist/index.html'))
  }
})

//***************************************/signup************/signup*********

app.get('/signup', checkAuthenticated, (req, res) => {
  res.render("signup")
});

// ************************************* getId ******* getId *******

app.get("/getId", async (req, res) => {
  
  if (req.isAuthenticated()) {
    let id = req.user.id;
    res.status(200).json(await id);
  }
});

// called from app ************** post logout ******* post logout ******* post logout *******
app.post('/users/logout', (req, res, next) => {
  logout(req, res);
  req.flash('success_msg1', "You have logged out.")
  res.redirect('/')
})
function logout(req, res, next) {
  res.clearCookie('connect.sid');
  req.logout(function (err) {
    if (err) { return next(err); }
  });//a function that comes with passport
  req.flash('logged_status', 'false')
}

// ****************************** post signup ******** post signup ******** post signup ********

app.post('/users/signup', async (req, res) => {
  let { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }
  if (password !== password2) {
    errors.push({ message: "Passwords do not match." })
  }
  if (errors.length > 0) { res.render('signup', { errors }) }
  else {
    let hashedPassword = await bcrypt.hash(password, 10);
    pool.connect(async (err, client, release) => {
      if (err) return console.error('Error acquiring client', err.stack);
      client.query(`SELECT * FROM users WHERE email = $1`, [email],
        (err, results) => {
          if (err) {
            throw err;
          }
          if (results.rows.length > 0) {
            errors.push({ message: "Email already registered" })
            res.render('signup', { errors })
          }
          else {
            client.query(`INSERT INTO users (user_name, email, password)
                   VALUES($1,$2,$3)
                      RETURNING id,password`, [name, email, hashedPassword], (err, result) => {
              if (err) {
                throw err
              }
              // console.log('results =', results.rows);
              req.flash('success_msg1', `You are now registered.`);
              req.flash('success_msg2', 'Please log in')
              res.redirect(('/'));
            });
          }
        })
      release();
      if (err) return console.error('Error executing user query', err.msg)
    })
  }
})
// ********************************* login ******* login ******* login *******
app.post("/users/login",
  passport.authenticate('local', {
    successRedirect: '/future-self',
    failureRedirect: "/login",
    failureFlash: true
  }))
// ******************************** checkAuth ***** checkAuth ***** checkAuth *****
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/future-self')
  }
  next();
}
// ******************************** checkNotAuth ***** checkNotAuth ***** checkNotAuth *****
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('checkNotAuthenticated')
    return next()
  }
  console.log("not Authenticated")
  res.redirect('/login')
}
// *************************************// Server //*********************//Server*********** */
const PORT = process.env.PORT;

https.createServer({
     key: fs.readFileSync('./cert/key.pem'),
     cert: fs.readFileSync('./cert/cert.pem'),
}, app).listen(PORT)
// app.listen(
//   PORT,
//   //console.log(`Something gruesome is happening at http://localhost:${PORT}`)
// );
