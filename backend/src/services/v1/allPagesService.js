const fs = require("fs").promises // promise tabanlı fs modülünü kullanacağız
const path = require("path")

const pageCreate = async ({ name, target, model, status }) => {
  const data = {
    name: name,
    target: target,
    model: model,
    status: status,
  }

  const filePath = path.join(__dirname, "../../../tmp/page.json")

  let fileContent
  try {
    // dosyayı okuma
    fileContent = await fs.readFile(filePath, "utf8")
  } catch (err) {
    if (err.code === "ENOENT") {
      // Dosya mevcut değilse, boş bir dizi oluştur
      fileContent = "[]"
    } else {
      console.error("Hata:", err)
      throw err
    }
  }

  // JSON'ı diziye dönüştürme ve yeni veriyi ekleyin
  const contentArray = JSON.parse(fileContent)
  contentArray.push(data)

  // Yeni içeriği dosyaya geri yazın
  return fs
    .writeFile(filePath, JSON.stringify(contentArray, null, 2))
    .then(() => "Successfully.")
    .catch((err) => {
      console.error("Hata:", err)
      throw err
    })
}

module.exports = {
  pageCreate,
}
