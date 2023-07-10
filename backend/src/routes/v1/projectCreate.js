const express = require("express")
const router = express.Router()
const { validate } = require("express-validation")
const { projectCreate } = require("../../services/v1/allProjectsService")
const validations = require("../../validations/projectSchema")

router.post("/", validate(validations.create), async (req, res, next) => {
  try {
    const message = await projectCreate({
      name: req.body.name,
      target: req.body.path,
    })
    res.status(200).json(message)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
