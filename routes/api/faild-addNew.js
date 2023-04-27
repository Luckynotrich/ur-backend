router.post("/addNew/", async (req, res) => {

  let form = new multiparty.Form();
  
  async function parse(){
    return new Promise(resolve =>{

      let pros = [], cons = [];
      let category = {pros,cons}

   form.parse(req, async (err, fields) => {
      await Object.keys(fields).forEach((property) => {
      console.log(fields[property])
      if (fields[property].toString().length > 0 && fields[property].toString() !== ' ') {
        if (property.startsWith('pro')) category.pros.push(fields[property].toString())
        else if (property.startsWith('con')) category.cons.push(fields[property].toString())
        else category[property] = fields[property].toString();
      }
    }
    )
  }
  )
  resolve(category);
})
}
 let newCategory = await parse();

if (!newCategory.name) {
  return res.status(400).json({ msg: "Name must be included" });
}
categories.push(newCategory);
insertCat(newCategory)
res.status(200).json(categories);
}

);