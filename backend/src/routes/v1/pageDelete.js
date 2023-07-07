const express = require("express")
const router = express.Router()
const { pageDelete } = require("../../services/v1/allPagesService")

router.delete("/:id", async (req, res, next) => {
  try {
    const message = await pageDelete({
      id: req.params.id,
    })
    res.status(200).json(message)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
