const express = require("express");
// const app = express;
const router = express.Router();
const multiparty = require('multiparty');

// router.use(express.urlencoded({ extended: false }));

router.put("/updatePrefs/", async (req, res) => {
    let form = new multiparty.Form();
    await form.parse(req, async (err, fields) => {
        await Object.keys(fields).forEach(async (key) => {
            await console.log('key = ', key, 'fields[key] = ', fields[key],'\n')
        })
    })
})
module.exports = router;