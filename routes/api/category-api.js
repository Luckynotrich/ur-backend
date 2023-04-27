const express = require("express");
const app = express;
const router = express.Router();
const multiparty = require('multiparty');


const getAllCats = require('../db/get-all-cats-db')
const insertCat = require('../db/insert-cat-db')


let categories = [];

router.use(express.urlencoded({ extended: false }));

// Gets all records
router.get("/:userId", async (req, response, next) => {

  let userId = req.params.userId

  try {
    setCats.cats = []
    //console.log('inside getAllCats userId = ',userId)
    await getAllCats(setCats, userId)
    categories = await setCats.cats
    setTimeout(() => 1000)

    response.send(categories)
  }
  catch (err) {
    console.log(err)
    await console.error(`Could not get categories: ${err}`);
  }

});
const setCats = {
  set current(category) {
    this.cats.push(category);
    //console.log('sc = ',category)
  },
  cats: []
}


// get single member
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

// add new category to array
router.post("/addNew/", async (req, res) => {

  let form = new multiparty.Form();


  let pros = [], cons = [];
  let newCategory = { pros, cons }

 await form.parse(req, async (err, fields) => { //push must be inside await form.parse -- insertCat fails without await
    await Object.keys(fields).forEach((property) => {//async await must resolve 
      
      if (fields[property].toString().length > 0 && fields[property].toString() !== ' ') {
        if (property.startsWith('pro')) newCategory.pros.push(fields[property].toString())
        else if (property.startsWith('con')) newCategory.cons.push(fields[property].toString())
        else newCategory[property] = fields[property].toString();
      }
      if (property === ('name') && newCategory[property].length === 0) {
        return res.status(400).json({ msg: "Name must be included" });
      }
    }
    )
    await categories.push(newCategory)     //inside form.parse is the key!
    await insertCat(newCategory)           //inside form.parse
    await res.status(200).json(categories) //inside form.parse
  })
});

// update single member
router.put("/updateOne/:id", (req, res) => {
  const found = categories.some(
    (category) => category.id === parseInt(req.params.id)
  );
  if (found) {
    const updCategory = req.body;
    categories.forEach((category) => {
      if (category.id === parseInt(req.params.id)) {
        category.name = updCategory ? updCategory.name : category.name;
        category.pros.forEach((pro) => {
          if (category.pro !== updCategory.pro)
            // eslint-disable-next-line curly
            category.pro = updCategory.pro ? updCategory.pro : category.pro;
        });
        category.cons.forEach((con) => {
          if (category.con !== updCategory.con)
            // eslint-disable-next-line curly
            category.con = updCategory.con ? updCategory.con : category.con;
        });

        category.cons = req.params.cons;
        res.json({ msg: "Category updated", category });
      }
    });
  } else {
    res.status(400).json({ msg: `Category ${req.params.id} not found` });
  }
});

//delet one
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
