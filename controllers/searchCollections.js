const db = require("../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")
const path = require("path")
const csv = require("fast-csv")

//variable to hold the data so that it can be exported after a search
var dataForExport

//standard query to return all records from transfers table. extra where params provided by user are added via named replacements
var materialSampleCollecitonsSelect = `SELECT p.id AS projectTableID, p.project, p.principalInvestigator, p.dbgContact, p.PIemail, o.id AS occurrenceTableID, o.occurrenceID, o.recordedBy, o.eventDate, o.scientificName, o.identifiedBy, o.dateIdentified, o.associatedTaxa, o.reproductiveCondition, o.occurrenceRemarks, o.habitat, o.country, o.stateProvince, o.county, o.locality, o.locationRemarks, o.locationID, o.decimalLatitude, o.decimalLongitude, o.minimumElevationInMeters, o.permitURI, ms.materialSampleType, ms.storageLocation, ms.disposition, SUM(ms.numberCollected) AS totalNumberCollected, SUM(ms.numberAvailable) AS totalNumberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, ps.id AS preservedSpecimenTableID, ps.catalogNumber, ps.recordNumber FROM occurrences AS o LEFT JOIN projects as p ON o.projectTableID = p.id LEFT JOIN materialSamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN preservedSpecimens as ps on o.id = ps.occurrenceTableID WHERE o.id IS NOT NULL`
//group by params
var groupBy = ` GROUP BY ms.materialSampleType, o.scientificName, o.eventDate, o.locality`


//function to define query and get materialSamples and associated metadata
async function searchCollections(req, res) {
    let whereClauses = [];
    let replacements = {};

    //project
    if (req.body.project !== '') {
        whereClauses.push(`AND p.project = :project`);
        replacements.project = req.body.project;
    }
    //scientificName
    if (req.body.scientificName !== '') {
        whereClauses.push(`AND o.scientificName LIKE :scientificName`);
        replacements.scientificName = `%${req.body.scientificName}%`;
    }
    //eventDate START DATE PROVIDED
    if (req.body.eventEarlyDate !== '' && req.body.eventLateDate === '') {
        whereClauses.push(`AND o.eventDate BETWEEN :eventEarlyDate AND '2300-01-01'`);
        replacements.eventEarlyDate = req.body.eventEarlyDate;
    }
    //eventDate START DATE AND END DATE PROVIDED
    if (req.body.eventEarlyDate !== '' && req.body.eventLateDate !== '') {
        whereClauses.push(`AND o.eventDate BETWEEN :eventEarlyDate AND :eventLateDate`);
        replacements.eventEarlyDate = req.body.eventEarlyDate;
        replacements.eventLateDate = req.body.eventLateDate;
    }
    //eventDate END DATE PROVIDED
    if (req.body.eventEarlyDate === '' && req.body.eventLateDate !== '') {
        whereClauses.push(`AND o.eventDate BETWEEN '1900-01-01' AND :eventLateDate`);
        replacements.eventLateDate = req.body.eventLateDate;
    }
    //stateProvince
    if (req.body.stateProvince !== '') {
        whereClauses.push(`AND o.stateProvince = :stateProvince`);
        replacements.stateProvince = req.body.stateProvince;
    }
    //county
    if (req.body.county !== '') {
        whereClauses.push(`AND o.county = :county`);
        replacements.county = req.body.county;
    }
    //locationID
    if (req.body.locationID !== '') {
        whereClauses.push(`AND o.locationID LIKE :locationID`);
        replacements.locationID = `%${req.body.locationID}%`;
    }
    //locationRemarks
    if (req.body.locationRemarks !== '') {
        whereClauses.push(`AND o.locationRemarks LIKE :locationRemarks`);
        replacements.locationRemarks = `%${req.body.locationRemarks}%`;
    }
    //recordedBy
    if (req.body.recordedBy !== '') {
        whereClauses.push(`AND o.recordedBy LIKE :recordedBy`);
        replacements.recordedBy = `%${req.body.recordedBy}%`;
    }
    //recordNumber
    if (req.body.recordNumber !== '') {
        whereClauses.push(`AND ps.recordNumber LIKE :recordNumber`);
        replacements.recordNumber = `%${req.body.recordNumber}%`;
    }
    //catalogNumber
    if (req.body.catalogNumber !== '') {
        whereClauses.push(`AND ps.catalogNumber = :catalogNumber`);
        replacements.catalogNumber = req.body.catalogNumber;
    }
    //locality IS EXACTLY
    if (req.body.locality !== '' && req.body.optradio === 'isExactly') {
        whereClauses.push(`AND o.locality = :locality`);
        replacements.locality = req.body.locality;
    }
    //locality STARTS WITH
    if (req.body.locality !== '' && req.body.optradio === 'startsWith') {
        whereClauses.push(`AND o.locality LIKE :localityStartsWith`);
        replacements.localityStartsWith = `${req.body.locality}%`;
    }
    //locality CONTAINS
    if (req.body.locality !== '' && req.body.optradio === 'contains') {
        whereClauses.push(`AND o.locality LIKE :localityContains`);
        replacements.localityContains = `%${req.body.locality}%`;
    }
    //materialSampleType
    if (req.body.materialSampleType !== '') {
        whereClauses.push(`AND ms.materialSampleType = :materialSampleType`);
        replacements.materialSampleType = req.body.materialSampleType;
    }

    const finalCollectionsQuery = materialSampleCollecitonsSelect
        .concat(' ', whereClauses.join(' '))
        .concat(groupBy);

    console.log(finalCollectionsQuery, replacements)

    sequelize.query(finalCollectionsQuery, { replacements, type: QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
      })
}

//------------------------------------------------------------------------------
//EXPORTING DATA TO CSV

//function to write the data into a csv and then create the file in the resources dir
async function exportSearchCollectionsToCSV(req, res) {
    //create the date object for the download file name
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = `${year}${month}${day}${hours}${minutes}${seconds}`;
    let filename = `${date}_collectionsSearchDataExport.csv`
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
const downloadSearchCollectionsResultsFile = (req, res) => {
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
    searchCollections,
    exportSearchCollectionsToCSV,
    downloadSearchCollectionsResultsFile
}