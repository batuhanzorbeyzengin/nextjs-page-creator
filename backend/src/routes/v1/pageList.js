const express = require("express")
const router = express.Router()
const { pageList } = require("../../services/v1/allPagesService")

router.get("/", async (req, res, next) => {
  try {
    const pages = await pageList()
    res.status(200).json(pages)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
