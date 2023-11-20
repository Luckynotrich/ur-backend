const express = require("express");
// const app = express;
const router = express.Router();
const multiparty = require('multiparty');


const getAllCats = require('../db/get-all-cats-db')
const insertPrefs = require('../db/insert-prefs-db.js')
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
    setTimeout(() => {100})
    // console.log('categories = ',categories)
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
  let name = '', userId = '';
  let category = { name, userId, pros: [], cons: [] }

  await form.parse(req, async (err, fields) => { //push must be inside await form.parse -- insertCat fails without await
    await Object.keys(fields).forEach((property) => {//async await must resolve 
      if (fields[property] && fields[property].toString().length > 0 &&
        fields[property].toString() !== ' ') {

        if (property.includes('name')) name = fields[property].toString();
        else if (property.includes('userId')) userId = fields[property].toString();
      }
      if (property.includes('name') && userId && name.length === 0) {
        console.log('name does not exist')
        return res.status(400).json({ msg: "Name must be included" });
      }
    }
    )
    if (!name) {
      return res.status(400).json({ msg: "Data error: name not found" });
    }
    if (categories.some((category) => category.name === name)) {
      return res.status(200).json({ msg: "Category name current" });
    }
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      let id = 0;
      client.query('INSERT INTO category(userid, cat_name) '
        + ' values($1, $2)'
        + ' returning id;', [userId, name],
        async (err, result) => {
          await res.status(200).json(id = await result.rows[0].id)
          await setTimeout(() => { categories.push({ id, name, userId }) }, 1000)
          release();
          if (err) {
            return console.error('Error executing query', err.stack)
          }

        })
    });
  })
});
//************************************************************* */ update single member*********************************
router.put("/updateOne/", async (req, res) => {

  let form = new multiparty.Form();

  let pros = [], cons = [];
  let id = null, name;
  let updCategory = { id, name, pros, cons }
  let category/*,  newData = [name] */

  await form.parse(req, async (err, fields) => { //push must be inside await form.parse -- insertCat fails without await
    await Object.keys(fields).forEach((property) => {//async await must resolve
      if (fields[property].toString().length > 0 && fields[property].toString() !== ' ') {
        if (property.includes('name')) updCategory.name = fields[property].toString()
        else
          if (property.includes('catId')) {
            updCategory.id = fields[property].toString()
            if (categories.some((category) => Number(category.id) === Number(updCategory.id))) {
              category = categories.find((category) => Number(category.id) === Number(updCategory.id))
            }
          }
          else if (property.includes('pro') && !property.includes('id')) {
            updCategory.pros.push(fields[property].toString())
          }
          else if (property.includes('con') && !property.includes('id'))
            updCategory.cons.push(fields[property].toString())
      }
    })


    try {

      async function qualify() {
        if (updCategory.name && category.name !== updCategory.name) {
          category.name = updCategory.name ? updCategory.name : category.name;

        } else if (!updCategory.name) { console.log('Updating category ', category.name) }
        else if (category.name === updCategory.name) { 
          console.log('preexisting category.name', category.name) }

        if (updCategory.pros.length > 0) {
          arrayifyPrefs(category.pros, updCategory.pros)
        };
        if (updCategory.cons.length > 0) {
          arrayifyPrefs(category.cons, updCategory.cons)
        };
      }
      await qualify();
      await insertPrefs(category)

      res.status(200).json({ msg: "Category updated", category });
    } catch {
      res.status(400).json({ msg: `Category ${updCategory.id} not found` });
      console.log('category id not found', updCategory.id)
    }

  });
})

function arrayifyPrefs(category, update) {
  for (let i = 0; i < update.length; i++) {
    if (i >= category.length) category.push(update[i])
    else category[i] = update[i]
  }
  if (category.length > update.length) {
    let j = category.length - update.length;
    category.splice(update.length, j)
  }
}
router.updatePrefs = arrayifyPrefs;
//******************************************************************************** */delet one************************
router.delete('/deleteOne/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Member deleted', members: members.filter(member =>
        member.id !== parseInt(req.params.id))
    });
  }
  else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
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
