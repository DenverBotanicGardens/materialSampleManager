const db = require("../models");
const fs = require("fs");
const csv = require("fast-csv");
const OccurrenceObj = require("./collectionConstructor");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;
const Project = db.project;

//records array contains the data objects in the format as they are upon upload
let records = [];
//collections array contains the data objects in the format where materialSample and preservedSpecimen are nested in an Occurrence object, using the Occurrence constructor
let collections = [];
//variable to hold the project ID for the data being uploaded
let projectTableID

// Utility function to convert empty strings to null
function convertEmptyToNull(value) {
  return value !== "" ? value : null;
}

//function that gets the project id from the client and sets it to the global varaible projectTableID
const getProjectID = (req,res) => {
  projectTableID = req.body.projectTableID
  res.send("Recieved ID")
}

//function that reformats data into array of nested Occurrence objects
async function importCollectionObjects() {
    for (let i = 0; i <records.length; i++){
      await new Promise(resolve => setTimeout(() => {
        //convert date fields to null if empty
        let eventDate = records[i].eventDate !== "" ? new Date(records[i].eventDate) : null;
        let preparationDate = records[i].preparationDate !== "" ? new Date(records[i].preparationDate) : null;
        let dateStored = records[i].dateStored !== "" ? new Date(records[i].dateStored) : null;
        let event = new OccurrenceObj(
          projectTableID,
          records[i].recordedBy,
          eventDate,
          convertEmptyToNull(records[i].scientificName),
          convertEmptyToNull(records[i].identifiedBy),
          convertEmptyToNull(records[i].dateIdentified),
          convertEmptyToNull(records[i].associatedTaxa),
          convertEmptyToNull(records[i].reproductiveCondition),
          convertEmptyToNull(records[i].occurrenceRemarks),
          convertEmptyToNull(records[i].habitat),
          convertEmptyToNull(records[i].country),
          convertEmptyToNull(records[i].stateProvince),
          convertEmptyToNull(records[i].county),
          convertEmptyToNull(records[i].locality),
          convertEmptyToNull(records[i].locationRemarks),
          convertEmptyToNull(records[i].locationID),
          convertEmptyToNull(records[i].decimalLatitude),
          convertEmptyToNull(records[i].decimalLongitude),
          convertEmptyToNull(records[i].minimumElevationInMeters),
          convertEmptyToNull(records[i].permitURI),
          convertEmptyToNull(records[i].materialSampleID),
          convertEmptyToNull(records[i].materialSampleType),
          convertEmptyToNull(records[i].materialSample_catalogNumber),
          convertEmptyToNull(records[i].materialSample_recordNumber),
          convertEmptyToNull(records[i].storageLocation),
          convertEmptyToNull(records[i].disposition),
          convertEmptyToNull(records[i].numberCollected),
          convertEmptyToNull(records[i].numberAvailable),
          convertEmptyToNull(records[i].sourcePlantCount),
          preparationDate,
          dateStored,
          convertEmptyToNull(records[i].catalogNumber),
          convertEmptyToNull(records[i].recordNumber)
          )
        collections.push(event)
        resolve()
      }, 1000))
  }
  console.log(collections.length)
  console.log(records.length)
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
  records = [];
  collections = []
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
        importCollectionObjects()
        res.status(200).json({
          success: true,
        message: "File successfully uploaded to database: " + req.file.originalname,
        })
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Could not upload the file: " + req.file.originalname + ". Please contact the Scientific Data Manager if this error persists."
      })
    }
  };

  module.exports = {
    csvUpload,
    getProjectID
  };
