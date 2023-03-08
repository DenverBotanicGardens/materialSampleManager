const db = require("../models");
const fs = require("fs");
const csv = require("fast-csv");
const OccurrenceObj = require("./collectionConstructor");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;

//records array contains the data objects in the format as they are upon upload
let records = [];
//collections array contains the data objects in the format where materialSample and preservedSpecimen are nested in an Occurrence object, using the Occurrence constructor
let collections = [];

//function that reformats data into array of nested Occurrence objects
async function importCollectionObjects() {
    for (let i = 0; i <records.length; i++){
      await new Promise(resolve => setTimeout(() => {
        let event = new OccurrenceObj(
          records[i].recordedBy,
          records[i].eventDate,
          records[i].scientificName,
          records[i].identifiedBy,
          records[i].dateIdentified,
          records[i].associatedTaxa,
          records[i].reproductiveCondition,
          records[i].occurrenceRemarks,
          records[i].habitat,
          records[i].country,
          records[i].stateProvince,
          records[i].county,
          records[i].locality,
          records[i].locationRemarks,
          records[i].locationID,
          records[i].decimalLatitude,
          records[i].decimalLongitude,
          records[i].minimumElevationInMeters,
          records[i].permitURI,
          records[i].materialSampleID,
          records[i].materialSampleType,
          records[i].materialSample_catalogNumber,
          records[i].materialSample_recordNumber,
          records[i].storageLocation,
          records[i].disposition,
          records[i].numberCollected,
          records[i].numberAvailable,
          records[i].sourcePlantCount,
          records[i].preparationDate,
          records[i].dateStored,
          records[i].catalogNumber,
          records[i].recordNumber
          )
        collections.push(event)
        resolve()
      }, 1000))
  }
  console.log(collections)
  insertData(collections)
}

//function that inserts the data into the db 
async function insertData(data) {
  //use bulkCreate with include to insert the data
  const result = await Occurrence.bulkCreate(data, {
    include : [
      {
        model: MaterialSample
      },
      {
        model: PreservedSpecimen
      }
    ]
  })
  .catch((err) => {
    console.log(err);
  })

}

//function that takes in a csv and parses the data into an array of objects (by row)
const csvUpload = async (req, res) => {
  
  //define location where uploaded file will go
  let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
  
  try {
      //if the user tries to upload no file
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
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
      //complete the http request
      .on("end", () => {
        console.log("csv uploaded to server")
        res.status(200).send()
        importCollectionObjects()
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      })
    }
  };

  module.exports = {
    csvUpload
  };
