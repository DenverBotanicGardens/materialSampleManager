const fs = require("fs")
const csv = require("fast-csv")

//download the specified file
const downloadTemplate = (req, res) => {
    const fileName = "materialSampleManager_uploadTemplate.csv"
    const directoryPath = __basedir + "/resources/static/assets/templates/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file" + err,
        })
      }
    })
  }

module.exports = {
    downloadTemplate
}