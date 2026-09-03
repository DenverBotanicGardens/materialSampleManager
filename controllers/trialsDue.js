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
const path = require("path")

//variable to hold the data so that it can be exported after a search
var dataForExport

const seed5yquery = "SELECT ANY_VALUE(ms.id) AS id, ANY_VALUE(ms.materialSample_catalogNumber) AS materialSample_catalogNumber, ANY_VALUE(ms.materialSample_recordNumber) AS materialSample_recordNumber, ANY_VALUE(ms.storageLocation) AS storageLocation, ANY_VALUE(ms.disposition) AS disposition, ANY_VALUE(ms.numberCollected) AS numberCollected, ANY_VALUE(ms.numberAvailable) AS numberAvailable, ANY_VALUE(ms.sourcePlantCount) AS sourcePlantCount, ANY_VALUE(ms.preparationDate) AS preparationDate, ANY_VALUE(ms.dateStored) AS dateStored, ANY_VALUE(o.recordedBy) AS recordedBy, o.eventDate, o.scientificName, ANY_VALUE(o.stateProvince) AS stateProvince, ANY_VALUE(o.county) AS county, o.locality, ANY_VALUE(o.decimalLatitude) AS decimalLatitude, ANY_VALUE(o.decimalLongitude) AS decimalLongitude, ANY_VALUE(o.minimumElevationInMeters) AS minimumElevationInMeters, ANY_VALUE(o.permitURI) AS permitURI, ANY_VALUE(gvt.testConductedBy) AS testConductedBy, ANY_VALUE(gvt.endDate) AS endDate, ANY_VALUE(gvt.numberSeedsTested) AS numberSeedsTested, ANY_VALUE(gvt.pretreatments) AS pretreatments, ANY_VALUE(gvt.incubationTempDay) AS incubationTempDay, ANY_VALUE(gvt.incubationTempNight) AS incubationTempNight, ANY_VALUE(gvt.viabilityAdjustedGermination) AS viabilityAdjustedGermination, ANY_VALUE(gvt.sampleFrozen) AS sampleFrozen, ANY_VALUE(gvt.medium) AS medium, ANY_VALUE(gvt.scarified) AS scarified, ANY_VALUE(gvt.stratificationTemperature) AS stratificationTemperature, ANY_VALUE(gvt.stratificationStartDate) AS stratificationStartDate, ANY_VALUE(gvt.incubationStartDate) AS incubationStartDate, ANY_VALUE(gvt.numberDead) AS numberDead, ANY_VALUE(gvt.numberViable) AS numberViable, ANY_VALUE(gvt.totalGerminants) AS totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN ( SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn FROM germplasmViabilityTests ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1 WHERE ms.materialSampleType = 'seed' AND (gvt.endDate IS NULL OR gvt.endDate < DATE_SUB(CURDATE(), INTERVAL 5 YEAR)) GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples that have never been tested, or not tested in the last 5 years
const getSeedSamplesDueForTrial_5y = (req,res) => {
    sequelize.query(seed5yquery,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
    })
}

const seed3yquery = "SELECT ANY_VALUE(ms.id) AS id, ANY_VALUE(ms.materialSample_catalogNumber) AS materialSample_catalogNumber, ANY_VALUE(ms.materialSample_recordNumber) AS materialSample_recordNumber, ANY_VALUE(ms.storageLocation) AS storageLocation, ANY_VALUE(ms.disposition) AS disposition, ANY_VALUE(ms.numberCollected) AS numberCollected, ANY_VALUE(ms.numberAvailable) AS numberAvailable, ANY_VALUE(ms.sourcePlantCount) AS sourcePlantCount, ANY_VALUE(ms.preparationDate) AS preparationDate, ANY_VALUE(ms.dateStored) AS dateStored, ANY_VALUE(o.recordedBy) AS recordedBy, o.eventDate, o.scientificName, ANY_VALUE(o.stateProvince) AS stateProvince, ANY_VALUE(o.county) AS county, o.locality, ANY_VALUE(o.decimalLatitude) AS decimalLatitude, ANY_VALUE(o.decimalLongitude) AS decimalLongitude, ANY_VALUE(o.minimumElevationInMeters) AS minimumElevationInMeters, ANY_VALUE(o.permitURI) AS permitURI, ANY_VALUE(gvt.testConductedBy) AS testConductedBy, ANY_VALUE(gvt.endDate) AS endDate, ANY_VALUE(gvt.numberSeedsTested) AS numberSeedsTested, ANY_VALUE(gvt.pretreatments) AS pretreatments, ANY_VALUE(gvt.incubationTempDay) AS incubationTempDay, ANY_VALUE(gvt.incubationTempNight) AS incubationTempNight, ANY_VALUE(gvt.viabilityAdjustedGermination) AS viabilityAdjustedGermination, ANY_VALUE(gvt.sampleFrozen) AS sampleFrozen, ANY_VALUE(gvt.medium) AS medium, ANY_VALUE(gvt.scarified) AS scarified, ANY_VALUE(gvt.stratificationTemperature) AS stratificationTemperature, ANY_VALUE(gvt.stratificationStartDate) AS stratificationStartDate, ANY_VALUE(gvt.incubationStartDate) AS incubationStartDate, ANY_VALUE(gvt.numberDead) AS numberDead, ANY_VALUE(gvt.numberViable) AS numberViable, ANY_VALUE(gvt.totalGerminants) AS totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN ( SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn FROM germplasmViabilityTests ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1 WHERE ms.materialSampleType = 'seed' AND (gvt.endDate IS NULL OR gvt.endDate < DATE_SUB(CURDATE(), INTERVAL 3 YEAR)) GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples that have never been tested, or not tested in the last 3 years
const getSeedSamplesDueForTrial_3y = (req,res) => {
    sequelize.query(seed3yquery,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
    })
}

const seed3yquery3550m = "SELECT ANY_VALUE(ms.id) AS id, ANY_VALUE(ms.materialSample_catalogNumber) AS materialSample_catalogNumber, ANY_VALUE(ms.materialSample_recordNumber) AS materialSample_recordNumber, ANY_VALUE(ms.storageLocation) AS storageLocation, ANY_VALUE(ms.disposition) AS disposition, ANY_VALUE(ms.numberCollected) AS numberCollected, ANY_VALUE(ms.numberAvailable) AS numberAvailable, ANY_VALUE(ms.sourcePlantCount) AS sourcePlantCount, ANY_VALUE(ms.preparationDate) AS preparationDate, ANY_VALUE(ms.dateStored) AS dateStored, ANY_VALUE(o.recordedBy) AS recordedBy, o.eventDate, o.scientificName, ANY_VALUE(o.stateProvince) AS stateProvince, ANY_VALUE(o.county) AS county, o.locality, ANY_VALUE(o.decimalLatitude) AS decimalLatitude, ANY_VALUE(o.decimalLongitude) AS decimalLongitude, ANY_VALUE(o.minimumElevationInMeters) AS minimumElevationInMeters, ANY_VALUE(o.permitURI) AS permitURI, ANY_VALUE(gvt.testConductedBy) AS testConductedBy, ANY_VALUE(gvt.endDate) AS endDate, ANY_VALUE(gvt.numberSeedsTested) AS numberSeedsTested, ANY_VALUE(gvt.pretreatments) AS pretreatments, ANY_VALUE(gvt.incubationTempDay) AS incubationTempDay, ANY_VALUE(gvt.incubationTempNight) AS incubationTempNight, ANY_VALUE(gvt.viabilityAdjustedGermination) AS viabilityAdjustedGermination, ANY_VALUE(gvt.sampleFrozen) AS sampleFrozen, ANY_VALUE(gvt.medium) AS medium, ANY_VALUE(gvt.scarified) AS scarified, ANY_VALUE(gvt.stratificationTemperature) AS stratificationTemperature, ANY_VALUE(gvt.stratificationStartDate) AS stratificationStartDate, ANY_VALUE(gvt.incubationStartDate) AS incubationStartDate, ANY_VALUE(gvt.numberDead) AS numberDead, ANY_VALUE(gvt.numberViable) AS numberViable, ANY_VALUE(gvt.totalGerminants) AS totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN ( SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn FROM germplasmViabilityTests ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1 WHERE o.minimumElevationInMeters > 3350 AND ms.materialSampleType = 'seed' AND (gvt.endDate IS NULL OR gvt.endDate < DATE_SUB(CURDATE(), INTERVAL 3 YEAR)) GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples above 3350m elevation that have never been tested, or not tested in the last 3 years
const getSeedSamplesDueForTrial_3y_3550m = (req,res) => {
    sequelize.query(seed3yquery3550m,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
    })
}

const seedNeverQuery = "SELECT ANY_VALUE(ms.id) AS id, ANY_VALUE(ms.materialSample_catalogNumber) AS materialSample_catalogNumber, ANY_VALUE(ms.materialSample_recordNumber) AS materialSample_recordNumber, ANY_VALUE(ms.storageLocation) AS storageLocation, ANY_VALUE(ms.disposition) AS disposition, ANY_VALUE(ms.numberCollected) AS numberCollected, ANY_VALUE(ms.numberAvailable) AS numberAvailable, ANY_VALUE(ms.sourcePlantCount) AS sourcePlantCount, ANY_VALUE(ms.preparationDate) AS preparationDate, ANY_VALUE(ms.dateStored) AS dateStored, ANY_VALUE(o.recordedBy) AS recordedBy, o.eventDate, o.scientificName, ANY_VALUE(o.stateProvince) AS stateProvince, ANY_VALUE(o.county) AS county, o.locality, ANY_VALUE(o.decimalLatitude) AS decimalLatitude, ANY_VALUE(o.decimalLongitude) AS decimalLongitude, ANY_VALUE(o.minimumElevationInMeters) AS minimumElevationInMeters, ANY_VALUE(o.permitURI) AS permitURI, ANY_VALUE(gvt.testConductedBy) AS testConductedBy, ANY_VALUE(gvt.endDate) AS endDate, ANY_VALUE(gvt.numberSeedsTested) AS numberSeedsTested, ANY_VALUE(gvt.pretreatments) AS pretreatments, ANY_VALUE(gvt.incubationTempDay) AS incubationTempDay, ANY_VALUE(gvt.incubationTempNight) AS incubationTempNight, ANY_VALUE(gvt.viabilityAdjustedGermination) AS viabilityAdjustedGermination, ANY_VALUE(gvt.sampleFrozen) AS sampleFrozen, ANY_VALUE(gvt.medium) AS medium, ANY_VALUE(gvt.scarified) AS scarified, ANY_VALUE(gvt.stratificationTemperature) AS stratificationTemperature, ANY_VALUE(gvt.stratificationStartDate) AS stratificationStartDate, ANY_VALUE(gvt.incubationStartDate) AS incubationStartDate, ANY_VALUE(gvt.numberDead) AS numberDead, ANY_VALUE(gvt.numberViable) AS numberViable, ANY_VALUE(gvt.totalGerminants) AS totalGerminants FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN germplasmViabilityTests AS gvt ON ms.id = gvt.materialSampleTableID WHERE ms.materialSampleType = 'seed' AND gvt.endDate IS NULL GROUP BY o.scientificName, o.eventDate, o.locality"

//get all seed samples with no germination trial records in the db
const getSeedSamplesDueForTrial_never = (req,res) => {
    sequelize.query(seedNeverQuery,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
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
    const fileName = path.basename(req.params.name); // strips any ../ or path separators
    const directoryPath = path.join(__basedir, "/resources/static/assets/downloads/");
    const filePath = path.join(directoryPath, fileName);

    // extra safety: confirm the resolved path is still inside directoryPath
    if (!filePath.startsWith(path.resolve(directoryPath))) {
        return res.status(400).send({ message: "Invalid file name" });
    }

    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).send({ message: "Could not download the file" + err });
      }
    });
}

    module.exports = {
        getSeedSamplesDueForTrial_5y,
        getSeedSamplesDueForTrial_3y,
        getSeedSamplesDueForTrial_3y_3550m,
        getSeedSamplesDueForTrial_never,
        exportTrialsDueToCSV,
        downloadTrialsDueFile
    }