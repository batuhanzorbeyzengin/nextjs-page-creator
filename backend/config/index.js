const consts = require("./consts")

const { PORT = consts.default_port, DOMAIN = consts.default_domain } =
  process.env

module.exports = {
  PORT,
  DOMAIN,
}
