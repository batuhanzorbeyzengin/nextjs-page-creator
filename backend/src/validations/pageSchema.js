const { Joi } = require('express-validation')

module.exports = {
  create: {
    body: Joi.object({
      pageName: Joi.string().required(),
      path: Joi.string().required(),
      model: Joi.string().required(),
      status: Joi.string().required()
    })
  },
}