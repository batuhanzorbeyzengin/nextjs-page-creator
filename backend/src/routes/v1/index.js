const express = require("express")
const router = express.Router()

router.use("/page", require("./pageCreate"))

module.exports = router
