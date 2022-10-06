const catObj = (pref) => {
    
    return this.cat = {
      name: pref.cat_name,
      id: pref.id,
      pros: [],
      cons: [],
    }
}
module.exports = catObj;