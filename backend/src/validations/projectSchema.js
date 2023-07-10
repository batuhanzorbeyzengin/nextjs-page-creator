const { Joi } = require('express-validation')

module.exports = {
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      path: Joi.string().required()
    })
  },
}