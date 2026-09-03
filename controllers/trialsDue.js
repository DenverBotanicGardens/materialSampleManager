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

const seed5yquery = `
WITH per_sample_latest_test AS (
    SELECT
        ms.id AS materialSampleTableID,
        ms.numberAvailable,
        o.scientificName,
        o.eventDate,
        o.locality,
        o.stateProvince,
        o.county,
        o.minimumElevationInMeters,
        gvt.endDate,
        gvt.testConductedBy,
        gvt.numberSeedsTested,
        gvt.viabilityAdjustedGermination
    FROM materialSamples AS ms
    LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id
    LEFT JOIN (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn
        FROM germplasmViabilityTests
    ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1
    WHERE ms.materialSampleType = 'seed'
),
collection_latest_trial AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY scientificName, eventDate, locality
            ORDER BY endDate DESC
        ) AS collection_rn
    FROM per_sample_latest_test
),
collection_totals AS (
    SELECT
        scientificName,
        eventDate,
        locality,
        SUM(numberAvailable) AS totalNumberAvailable,
        COUNT(*) AS numberOfSamples
    FROM per_sample_latest_test
    GROUP BY scientificName, eventDate, locality
)
SELECT
    clt.scientificName,
    clt.endDate,
    clt.numberSeedsTested,
    clt.viabilityAdjustedGermination,
    clt.testConductedBy,
    totals.totalNumberAvailable,
    totals.numberOfSamples,
    clt.eventDate,
    clt.stateProvince,
    clt.county,
    clt.minimumElevationInMeters
FROM collection_latest_trial clt
JOIN collection_totals totals
  ON clt.scientificName <=> totals.scientificName
 AND clt.eventDate <=> totals.eventDate
 AND clt.locality <=> totals.locality
WHERE clt.collection_rn = 1
  AND (clt.endDate IS NULL OR clt.endDate < DATE_SUB(CURDATE(), INTERVAL 5 YEAR))
`;

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

const seed3yquery = `
WITH per_sample_latest_test AS (
    SELECT
        ms.id AS materialSampleTableID,
        ms.numberAvailable,
        o.scientificName,
        o.eventDate,
        o.locality,
        o.stateProvince,
        o.county,
        o.minimumElevationInMeters,
        gvt.endDate,
        gvt.testConductedBy,
        gvt.numberSeedsTested,
        gvt.viabilityAdjustedGermination
    FROM materialSamples AS ms
    LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id
    LEFT JOIN (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn
        FROM germplasmViabilityTests
    ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1
    WHERE ms.materialSampleType = 'seed'
),
collection_latest_trial AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY scientificName, eventDate, locality
            ORDER BY endDate DESC
        ) AS collection_rn
    FROM per_sample_latest_test
),
collection_totals AS (
    SELECT
        scientificName,
        eventDate,
        locality,
        SUM(numberAvailable) AS totalNumberAvailable,
        COUNT(*) AS numberOfSamples
    FROM per_sample_latest_test
    GROUP BY scientificName, eventDate, locality
)
SELECT
    clt.scientificName,
    clt.endDate,
    clt.numberSeedsTested,
    clt.viabilityAdjustedGermination,
    clt.testConductedBy,
    totals.totalNumberAvailable,
    totals.numberOfSamples,
    clt.eventDate,
    clt.stateProvince,
    clt.county,
    clt.minimumElevationInMeters
FROM collection_latest_trial clt
JOIN collection_totals totals
  ON clt.scientificName <=> totals.scientificName
 AND clt.eventDate <=> totals.eventDate
 AND clt.locality <=> totals.locality
WHERE clt.collection_rn = 1
  AND (clt.endDate IS NULL OR clt.endDate < DATE_SUB(CURDATE(), INTERVAL 3 YEAR))
`;

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

const seed3yquery3350m = `
WITH per_sample_latest_test AS (
    SELECT
        ms.id AS materialSampleTableID,
        ms.numberAvailable,
        o.scientificName,
        o.eventDate,
        o.locality,
        o.stateProvince,
        o.county,
        o.minimumElevationInMeters,
        gvt.endDate,
        gvt.testConductedBy,
        gvt.numberSeedsTested,
        gvt.viabilityAdjustedGermination
    FROM materialSamples AS ms
    LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id
    LEFT JOIN (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn
        FROM germplasmViabilityTests
    ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1
    WHERE ms.materialSampleType = 'seed'
      AND o.minimumElevationInMeters > 3350
),
collection_latest_trial AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY scientificName, eventDate, locality
            ORDER BY endDate DESC
        ) AS collection_rn
    FROM per_sample_latest_test
),
collection_totals AS (
    SELECT
        scientificName,
        eventDate,
        locality,
        SUM(numberAvailable) AS totalNumberAvailable,
        COUNT(*) AS numberOfSamples
    FROM per_sample_latest_test
    GROUP BY scientificName, eventDate, locality
)
SELECT
    clt.scientificName,
    clt.endDate,
    clt.numberSeedsTested,
    clt.viabilityAdjustedGermination,
    clt.testConductedBy,
    totals.totalNumberAvailable,
    totals.numberOfSamples,
    clt.eventDate,
    clt.stateProvince,
    clt.county,
    clt.minimumElevationInMeters
FROM collection_latest_trial clt
JOIN collection_totals totals
  ON clt.scientificName <=> totals.scientificName
 AND clt.eventDate <=> totals.eventDate
 AND clt.locality <=> totals.locality
WHERE clt.collection_rn = 1
  AND (clt.endDate IS NULL OR clt.endDate < DATE_SUB(CURDATE(), INTERVAL 3 YEAR))
`;

//get all seed samples above 3350m elevation that have never been tested, or not tested in the last 3 years
const getSeedSamplesDueForTrial_3y_3550m = (req,res) => {
    sequelize.query(seed3yquery3350m,{type: QueryTypes.SELECT})
    .then((data) => {
        res.send(data)
        dataForExport = data
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
    })
}

const seedNeverQuery = `
WITH per_sample_latest_test AS (
    SELECT
        ms.id AS materialSampleTableID,
        ms.numberAvailable,
        o.scientificName,
        o.eventDate,
        o.locality,
        o.stateProvince,
        o.county,
        o.minimumElevationInMeters,
        gvt.endDate,
        gvt.testConductedBy,
        gvt.numberSeedsTested,
        gvt.viabilityAdjustedGermination
    FROM materialSamples AS ms
    LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id
    LEFT JOIN (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY materialSampleTableID ORDER BY endDate DESC) AS rn
        FROM germplasmViabilityTests
    ) gvt ON ms.id = gvt.materialSampleTableID AND gvt.rn = 1
    WHERE ms.materialSampleType = 'seed'
),
collection_latest_trial AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY scientificName, eventDate, locality
            ORDER BY endDate DESC
        ) AS collection_rn
    FROM per_sample_latest_test
),
collection_totals AS (
    SELECT
        scientificName,
        eventDate,
        locality,
        SUM(numberAvailable) AS totalNumberAvailable,
        COUNT(*) AS numberOfSamples
    FROM per_sample_latest_test
    GROUP BY scientificName, eventDate, locality
)
SELECT
    clt.scientificName,
    clt.endDate,
    clt.numberSeedsTested,
    clt.viabilityAdjustedGermination,
    clt.testConductedBy,
    totals.totalNumberAvailable,
    totals.numberOfSamples,
    clt.eventDate,
    clt.stateProvince,
    clt.county,
    clt.minimumElevationInMeters
FROM collection_latest_trial clt
JOIN collection_totals totals
  ON clt.scientificName <=> totals.scientificName
 AND clt.eventDate <=> totals.eventDate
 AND clt.locality <=> totals.locality
WHERE clt.collection_rn = 1
  AND clt.endDate IS NULL
`;

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