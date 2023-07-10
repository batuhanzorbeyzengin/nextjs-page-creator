const { v4: uuidv4 } = require("uuid")

const projectCreate = ({ name, target }) => {
  const data = {
    id: uuidv4(),
    name: name,
    path: target,
  }
  return data
}

const projectsList = () => {
  return null
}

module.exports = {
  projectCreate,
  projectsList,
}
