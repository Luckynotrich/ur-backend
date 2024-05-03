const localStrategy = require("passport-local").Strategy;
const db = require('../routes/db/fs_pool.js');
const pool = db.getPool();
const bcrypt = require("bcrypt");


function initialize(passport) {
    
    const authenticateUser = (email, password, done) => {
        
        console.log('authenticateUser');
        pool.connect(async (err, client, release) => {
            if (err) return console.error('Error acquiring client', err.stack);
            client.query(`SELECT * FROM users WHERE email = $1`,[email],
                (err, results) => {
                    if (err) throw err;
                    
                    if (results.rows.length > 0) {
                        const user = results.rows[0];
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw error;
                            if (isMatch) {
                                return done(null, user);
                            }
                            else return done(null, false, { message: "Password or username is not correct." })
                        })
                    } else return done(null, false, { message: "User is not regisered" })
                })
            release();
            if (err) return console.error('Error executing user query', err.msg)
        })
    }

    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: "password"
    },
        authenticateUser,  
    )
    );
    passport.serializeUser((user, done) => {
        console.log('serialize user.id =',user.id);
       return done(null, {
            id: user.id,
            username: user.user_name,
            email: user.email
        })
    });
    
    passport.deserializeUser((user, done) => {
        console.log('deserialize =', user.id);
        let id = user.id;
        pool.connect(async (err, client, release) => {
            if (err) return console.error('Error acquiring client', err.stack);
            client.query(
                `SELECT * FROM  users  WHERE id = $1`, [id], (err, results) => {
                    if (err) throw err
                    return done(null, results.rows[0])
                });
            release();
            if (err) return console.error('Error executing user query', err.msg)
        }
        )
        // return done(null,user)
    });
}
module.exports = initialize;