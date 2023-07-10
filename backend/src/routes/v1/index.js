const express = require("express")
const router = express.Router()

//Page Router
router.use("/page", require("./pageCreate"))
router.use("/pages", require("./pageList"))
router.use("/page", require("./pageDelete"))


//Project Router
router.use("/project", require("./projectCreate"))
router.use("/projects", require("./projectsList"))


module.exports = router
