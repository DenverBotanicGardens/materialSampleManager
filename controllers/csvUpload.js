const db = require("../models");
const fs = require("fs");
const csv = require("fast-csv");
const Collection = require("./collectionConstructor")

const csvUpload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
      
      let records = [];
      let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
      
      //Use fs.createReadStream() method to read the file
      fs.createReadStream(path)
        //parse the csv using the fast-csv package
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        //read the data from the file and add it to the records array
        .on("data", (csvData) => {
          records.push(csvData);
        })
        //comnplete the http request and display the records array
        .on("end", () => {
            console.log("csv uploaded to server")
            res.send()
            //console.log(records)
            var collectionOne = new Collection('test','test','test','test')
            console.log(collectionOne)
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  };

  module.exports = {
    csvUpload,
  };


