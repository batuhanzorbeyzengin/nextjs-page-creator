const fs = require("fs").promises
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const pageCreate = async ({ name, target, model, status }) => {
  const data = {
    id: uuidv4(),
    name: name,
    target: target,
    model: model,
    status: status,
  }

  const filePath = path.join(__dirname, "../../../tmp/page.json")

  let fileContent
  try {
    fileContent = await fs.readFile(filePath, "utf8")
  } catch (err) {
    if (err.code === "ENOENT") {
      fileContent = "[]"
    } else {
      console.error("Hata:", err)
      throw err
    }
  }
  const contentArray = JSON.parse(fileContent)
  contentArray.push(data)
  return fs
    .writeFile(filePath, JSON.stringify(contentArray, null, 2))
    .then(() => "Successfully.")
    .catch((err) => {
      console.error("Hata:", err)
      throw err
    })
}

const pageList = async () => {
  const filePath = path.join(__dirname, "../../../tmp/page.json")

  try {
    const fileContent = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContent)
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`File doesn't exist: ${err}`)
      return []
    } else {
      console.error("An error occurred:", err)
      throw err
    }
  }
}

const pageDelete = async ({id}) => {
  const filePath = path.join(__dirname, "../../../tmp/page.json")

  let fileContent
  try {
    fileContent = await fs.readFile(filePath, "utf8")
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`File doesn't exist: ${err}`)
      return "File not found."
    } else {
      console.error("An error occurred:", err)
      throw err
    }
  }

  const contentArray = JSON.parse(fileContent)
  const newContentArray = contentArray.filter((item) => item.id !== id)

  if (contentArray.length === newContentArray.length) {
    return "No item found with given id."
  }

  try {
    await fs.writeFile(filePath, JSON.stringify(newContentArray, null, 2))
    return "Successfully deleted."
  } catch (err) {
    console.error("An error occurred during deletion:", err)
    throw err
  }
}

module.exports = {
  pageCreate,
  pageList,
  pageDelete,
}
