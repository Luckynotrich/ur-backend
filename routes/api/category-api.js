const express = require("express");
// const app = express;
const router = express.Router();
const multiparty = require('multiparty');


const getAllCats = require('../db/get-all-cats-db')
const { updatePrefs } = require('../db/prefs-db.js')
let db = require('../db/fs_pool.js');
const pool = db.getPool();

let categories = [];

router.use(express.urlencoded({ extended: false }));

// Gets all records
router.get("/:userId", async (req, response, next) => {

  let userId = req.params.userId

  try {
    setCats.cats = []
    // console.log("get cats userId = ", userId)
    await getAllCats(setCats, userId)
    categories = await setCats.cats
    setTimeout(() => { 100 })
    await response.send(categories)
  }
  catch (err) {
    console.log(err)
    await console.error(`Could not get categories: ${err}`);
  }

});
const setCats = {
  set current(category) {
    this.cats.push(category);
    //  console.log('sc = ',category)
  },
  cats: []
}


//************************************************** */ get single member********************************************
router.get("/getOne/:id", (req, res) => {
  const found = categories.some(
    (category) => category.id === parseInt(req.params.id)
  );
  if (found) {
    res.json(
      categories.filter((category) => category.id === parseInt(req.params.id))
    );
  } else {
    res.status(400).json({ msg: `Category ${req.params.id} not found` });
  }
});

// **********************************************add new category to array*******************************************
router.post("/addNew/", async (req, res) => {

  let form = new multiparty.Form();
  let name = '', userId = '', id = null;
  let category = { name, id, pros: [], cons: [] }

  await form.parse(req, async (err, fields) => { //push must be inside await form.parse -- insertCat fails without await
    // console.log('fields = ', fields)
    await Object.keys(fields).forEach((property) => {//async await must resolve 

      if (property.includes('name')) {
        name = fields[property].toString();
        if (name && name.length > 3 || !categories.some((cat) => cat.name === name)) category.name = name;
        else return res.status(400).json({ msg: "Name not included, name may be too short or already exists" });
      }
      else if (property.includes('userId')) {
        userId = fields[property].toString();
        if (!userId && userId.length !== 36)
          return res.status(400).json({ msg: "userId not included or may be wrong length" });
      }
      else getProsAndCons(category, property, fields[property])
    })
    if (name && userId) {
      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        let id = 0;
        client.query('INSERT INTO category(userid, cat_name) '
          + ' values($1, $2)'
          + ' returning id;', [userId, name],
          async (err, result) => {
            category.id = await result.rows[0].id;
            await res.status(200).json(await category);
            await updatePrefs(category)
            await categories.push(category)
            await release();
          })
      })
    }
  });
});
const getProsAndCons = async (category, property, field) => {
  // console.log('property = ', property, ' field = ', field)
  if (property.includes('pros')) {
    let array = field.filter(Boolean);
    category.pros = array.map((pro) => { 
       return pro.trim() });
  }
  else if (property.includes('cons')) {
    let array = field.filter(Boolean);
    category.cons = array.map((con) => { 
      return con.trim() });
  }
  else if (property.includes('pro') && !property.includes('id')) {
    if (field[property].toString() !== '') category.pros.push(field[property].toString());
  }
  else if (property.includes('con') && !property.includes('id')) {
    if (field[property].toString() !== '') category.cons.push(field[property].toString());
  }
}
//************************************************************* */ update single member*********************************
router.put("/updateOne/", async (req, res) => {

  let form = new multiparty.Form();

  let pros = [], cons = [], id = null;
  let updCategory = { id, pros, cons }
  let category = { id }


  await form.parse(req, async (err, fields) => { //push must be inside await form.parse -- insertCat fails without await
    await Object.keys(fields).forEach((property) => {//async await must resolve
      if (fields[property].toString().length > 0 &&
        fields[property].toString() !== ' ') {

        if (property.includes('catId')) {
          updCategory.id = fields[property].toString()
          if (categories.map((cat) => { if (Number(cat.id) === Number(updCategory.id)) { return true } })) {
            category.id = updCategory.id
          }
        }
        else getProsAndCons(updCategory, property, fields[property])
      }

    })
    if (!category.id) {
      return res.status(400).json({ msg: "Data error: id not found" });
    }
    try {
      await updatePrefs(updCategory)

      await res.status(200).json({ msg: `Category ${updCategory.id} updated` });
    } catch {
      res.status(400).json({ msg: `Category update failed` });
      console.log(`Category ${updCategory.id} failed.`)
    }

  });
})

//******************************************************************************** */delet one************************
router.delete('/delete/:id', async (req, res) => {
  await Object.keys(fields).forEach((property) => {//async await must resolve
    if (fields[property].toString().length > 0 &&
      fields[property].toString() !== ' ') {
        if(property.includes('id')){
        res.json({
          msg: 'Member deleted', members: members.filter(member =>
            member.id !== parseInt(req.params.id))
        });}
        else {
          res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
        }
    }
  })
  
  
});


async function writeCatFile(categories) {
  const filePath = path.resolve(__dirname, "../../data/catFile.js");
  const fileData =
    "const categories =" +
    JSON.stringify(categories, null, "\t") +
    "\n module.exports = categories";

  try {
    const data = await fs.writeFile(filePath, fileData, () =>
      console.log("writeCat", data)
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
