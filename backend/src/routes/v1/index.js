const express = require("express")
const router = express.Router()

router.use("/page", require("./pageCreate"))
router.use("/pages", require("./pageList"))

module.exports = router
