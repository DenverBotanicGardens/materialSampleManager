const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest;
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")
const csv = require("fast-csv")

//variable to hold the data so that it can be exported after a search
var dataForExport

const seed5yquery = "SELECT ms.id, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, o.recordedBy, o.eventDate, o.scientificName, o.stateProvince, o.county, o.locality, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, gvt.testConductedBy, gvt.endDate, gvt.numberSeedsTested, gvt.pretreatments, gvt.incubationTempDay, gvt.incubationTempNight, gvt.viabilityAdjustedGermination, gvt.sampleFrozen, gvt.medium, gvt.scarified, gvt.stratificationTemperature, gvt.stratificationStartDate, gvt.incubationStartDate, gvt.numberDead, gvt.numberViable, gvt.totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN ( SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn FROM germplasmViabilityTests ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1 WHERE ms.materialSampleType = 'seed' AND (gvt.endDate IS NOT NULL OR gvt.endDate < DATE_SUB(CURDATE(), INTERVAL 5 YEAR)) GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples that have not been tested in last 5 years
const getSeedSamplesDueForTrial_5y = (req,res) => {
    sequelize.query(seed5yquery,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
    })
}

const seed3yquery = "SELECT ms.id, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, o.recordedBy, o.eventDate, o.scientificName, o.stateProvince, o.county, o.locality, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, gvt.testConductedBy, gvt.endDate, gvt.numberSeedsTested, gvt.pretreatments, gvt.incubationTempDay, gvt.incubationTempNight, gvt.viabilityAdjustedGermination, gvt.sampleFrozen, gvt.medium, gvt.scarified, gvt.stratificationTemperature, gvt.stratificationStartDate, gvt.incubationStartDate, gvt.numberDead, gvt.numberViable, gvt.totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN ( SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn FROM germplasmViabilityTests ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1 WHERE ms.materialSampleType = 'seed' AND (gvt.endDate IS NOT NULL OR gvt.endDate < DATE_SUB(CURDATE(), INTERVAL 3 YEAR)) GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples that have not been tested in last 5 years
const getSeedSamplesDueForTrial_3y = (req,res) => {
    sequelize.query(seed3yquery,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
    })
}

const seed3yquery3550m = "SELECT ms.id, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, o.recordedBy, o.eventDate, o.scientificName, o.stateProvince, o.county, o.locality, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, gvt.testConductedBy, gvt.endDate, gvt.numberSeedsTested, gvt.pretreatments, gvt.incubationTempDay, gvt.incubationTempNight, gvt.viabilityAdjustedGermination, gvt.sampleFrozen, gvt.medium, gvt.scarified, gvt.stratificationTemperature, gvt.stratificationStartDate, gvt.incubationStartDate, gvt.numberDead, gvt.numberViable, gvt.totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN ( SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn FROM germplasmViabilityTests ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1 WHERE o.minimumElevationInMeters > 3350 AND ms.materialSampleType = 'seed' AND (gvt.endDate IS NOT NULL OR gvt.endDate < DATE_SUB(CURDATE(), INTERVAL 3 YEAR)) GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples that have not been tested in last 5 years
const getSeedSamplesDueForTrial_3y_3550m = (req,res) => {
    sequelize.query(seed3yquery3550m,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
    })
}

const seedNeverQuery = "SELECT ms.id, ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, o.recordedBy, o.eventDate, o.scientificName, o.stateProvince, o.county, o.locality, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, gvt.testConductedBy, gvt.endDate, gvt.numberSeedsTested, gvt.pretreatments, gvt.incubationTempDay, gvt.incubationTempNight, gvt.viabilityAdjustedGermination, gvt.sampleFrozen, gvt.medium, gvt.scarified, gvt.stratificationTemperature, gvt.stratificationStartDate, gvt.incubationStartDate, gvt.numberDead, gvt.numberViable, gvt.totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN germplasmViabilityTests AS gvt ON ms.id = gvt.materialSampleTableID WHERE ms.materialSampleType = 'seed' AND gvt.endDate IS NULL GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples that have not been tested in last 5 years
const getSeedSamplesDueForTrial_never = (req,res) => {
    sequelize.query(seedNeverQuery,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
    })
}


//EXPORTING DATA TO CSV

//function to write the data into a csv and then create the file in the resources dir
async function exportTrialsDueToCSV(req, res) {
    //create the date object for the download file name
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = `${year}${month}${day}${hours}${minutes}${seconds}`;
    let filename = `${date}_germinationTrialsDueExport.csv`
    //set the path for the file
    const ws = fs.createWriteStream(`./resources/static/assets/downloads/${filename}`)
    await new Promise(resolve => setTimeout(() => {
        //console.log(dataForExport)
        csv.write(dataForExport, { headers: true })
        .pipe(ws)
        .on("finish", function(){
            console.log("CSV successfully created")
        })
        resolve()
    },1000))
    .then((data) => {
        res.send(filename)
    })
    .catch((err) => {
        console.log(err);
      })
}

//download the specified file
const downloadTrialsDueFile = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/downloads/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file" + err,
        })
      }
    })
  }

    module.exports = {
        getSeedSamplesDueForTrial_5y,
        getSeedSamplesDueForTrial_3y,
        getSeedSamplesDueForTrial_3y_3550m,
        getSeedSamplesDueForTrial_never,
        exportTrialsDueToCSV,
        downloadTrialsDueFile
    }