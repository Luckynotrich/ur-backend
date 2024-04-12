const bcrypt = require('bcrypt');
const process = require('process');

let hashedPassword;
const hashpw = async (password) =>{
 hashedPassword = await bcrypt.hash(password, 10);
 console.log('hashedPassword =',hashedPassword)
}

hashpw(process.argv[2])
