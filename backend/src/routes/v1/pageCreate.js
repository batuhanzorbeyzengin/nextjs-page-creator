const express = require("express")
const router = express.Router()
const { pageCreate } = require("../../services/v1/allPagesService")

router.post("/", async (req, res, next) => {
  try {
    const message = await pageCreate({
      name: req.body.pageName,
      target: req.body.path,
      model: req.body.model,
      status: req.body.status,
    })
    console.log(message)
    res.status(200).json({ message: message })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
