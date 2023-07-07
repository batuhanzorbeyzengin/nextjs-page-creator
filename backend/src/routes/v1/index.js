const express = require("express")
const router = express.Router()

//page_create
router.use("/page", require("./pageCreate"))
//all_page_list
router.use("/pages", require("./pageList"))
//page_delete
router.use("/page", require("./pageDelete"))

module.exports = router
