const express = require("express")
const router = express.Router()
const { projectsList } = require("../../services/v1/allProjectsService")

router.get("/", async (req, res, next) => {
  try {
    const pages = await projectsList()
    res.status(200).json(pages)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
