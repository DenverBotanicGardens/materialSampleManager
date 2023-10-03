const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest;
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

//empty array to populate with parameters that make up where clause
var germplasmTrialQuery = []
//standard query to return all records from germplasmviabilitytest table. extra where params provided by user are concatted to the end of this string
var germplasmTrialSelect = `SELECT gvt.id,gvt.materialSample_catalogNumber,gvt.stratificationStartDate,gvt.endDate,gvt.testConductedBy,gvt.sampleFrozen,gvt.medium,gvt.scarified,gvt.stratificationTemperature,gvt.incubationStartDate,gvt.numberSeedsTested,gvt.incubationTempDay,gvt.incubationTempNight,gvt.numberDead,gvt.numberViable,gvt.totalGerminants,gvt.viabilityAdjustedGermination,o.scientificName,o.eventDate,o.stateProvince,o.county,o.locality,o.locationRemarks,o.locationID,o.recordedBy FROM occurrences AS o LEFT JOIN materialsamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN germplasmviabilitytests AS gvt ON ms.id = gvt.materialSampleTableID WHERE gvt.id IS NOT NULL`
//empty array to populate with parameters that make up where clause
var germplasmTrialQueryByID = []
//query to return record from germplasmviabilitytest based on id
var germplasmTrialSelectByID = `SELECT gvt.id,gvt.materialSample_catalogNumber,gvt.stratificationStartDate,gvt.endDate,gvt.testConductedBy,gvt.sampleFrozen,gvt.medium,gvt.scarified,gvt.stratificationTemperature,gvt.incubationStartDate,gvt.numberSeedsTested,gvt.incubationTempDay,gvt.incubationTempNight,gvt.numberDead,gvt.numberViable,gvt.totalGerminants,gvt.viabilityAdjustedGermination,o.scientificName,o.eventDate,o.stateProvince,o.county,o.locality,o.locationRemarks,o.locationID,o.recordedBy FROM occurrences AS o LEFT JOIN materialsamples AS ms ON o.id = ms.occurrenceTableID LEFT JOIN germplasmviabilitytests AS gvt ON ms.id = gvt.materialSampleTableID `
//function to define query and get germination trials
async function getGerminationTrials(req, res) {
    await new Promise(resolve => setTimeout(() => {
        //catalogNumber
        if (req.body.materialSample_catalogNumber !== '') {
            germplasmTrialQuery.push(` AND gvt.materialSample_catalogNumber = '${req.body.materialSample_catalogNumber}'`);
        }
        //scientificName
        if (req.body.scientificName !== '') {
            germplasmTrialQuery.push(` AND o.scientificName LIKE '%${req.body.scientificName}%'`);
        }
        //stratificationStartDate
        if (req.body.stratStartEarlyDate !== '' && req.body.stratStartLateDate === '') {
            germplasmTrialQuery.push(` AND gvt.stratificationStartDate BETWEEN '${req.body.stratStartEarlyDate}' AND '2300-01-01'`)
        }
        if (req.body.stratStartEarlyDate !== '' && req.body.stratStartLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.stratificationStartDate '${req.body.stratStartEarlyDate}' AND '${req.body.stratStartLateDate}'`)
        }
        if (req.body.stratStartEarlyDate === '' && req.body.stratStartLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.stratificationStartDate '1900-01-01' AND '${req.body.stratStartLateDate}'`)
        }
        //endDate
        if (req.body.endEarlyDate !== '' && req.body.endLateDate === '') {
            germplasmTrialQuery.push(` AND gvt.endDate BETWEEN '${req.body.endEarlyDate}' AND '2300-01-01'`)
        }
        if (req.body.endEarlyDate !== '' && req.body.endLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.endDate BETWEEN '${req.body.endEarlyDate}' AND '${req.body.endLateDate}'`)
        }
        if (req.body.endEarlyDate === '' && req.body.endLateDate !== '') {
            germplasmTrialQuery.push(` AND gvt.endDate BETWEEN '1900-01-01' AND '${req.body.endLateDate}'`)
        }
        //eventDate
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate === '') {
            germplasmTrialQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '2300-01-01'`)
        }
        if (req.body.eventEarlyDate !== '' && req.body.eventLateDate !== '') {
            germplasmTrialQuery.push(` AND o.eventDate BETWEEN '${req.body.eventEarlyDate}' AND '${req.body.eventLateDate}'`)
        }
        if (req.body.eventEarlyDate === '' && req.body.eventLateDate !== '') {
            germplasmTrialQuery.push(` AND o.eventDate BETWEEN '1900-01-01' AND '${req.body.eventLateDate}'`)
        }
        //stateProvince
        if (req.body.stateProvince !== ''){
            germplasmTrialQuery.push(` AND o.stateProvince = '${req.body.stateProvince}'`)
        }
        //county
        if (req.body.county !== ''){
            germplasmTrialQuery.push(` AND o.county = '${req.body.county}'`)
        }
        //locality
        if (req.body.locality !== ''){
            germplasmTrialQuery.push(` AND o.locality LIKE '%${req.body.locality}%'`)
        }
        //locationRemarks
        if (req.body.locationRemarks !== ''){
            germplasmTrialQuery.push(` AND o.locationRemarks LIKE '%${req.body.locationRemarks}%'`)
        }
        //locationID
        if (req.body.locationID !== ''){
            germplasmTrialQuery.push(` AND o.locationID LIKE '%${req.body.locationID}%'`)
        }
        //recordedBy
        if (req.body.recordedBy !== ''){
            germplasmTrialQuery.push(` AND o.recordedBy LIKE '%${req.body.recordedBy}%'`)
        }
        fullGermplasmTrialQuery = germplasmTrialQuery.join()
        queryParams = fullGermplasmTrialQuery.replaceAll(',','')
        finalQuery = germplasmTrialSelect.concat(queryParams)
        germplasmTrialQuery = []
        console.log(finalQuery)
        resolve()
    },1000))
    sequelize.query(finalQuery, { type:QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
      })
}

//function to get one germination trial by id
async function getGerminationTrialByID(req, res) {
        //id
        if (req.body.id !== '') {
            germplasmTrialQueryByID.push(` WHERE gvt.id = '${req.body.id}'`);
        }
    await new Promise(resolve => setTimeout(() => {
        fullGermplasmTrialQueryByID = germplasmTrialQueryByID.join()
        queryParamsByID = fullGermplasmTrialQueryByID.replaceAll(',','')
        finalQueryByID = germplasmTrialSelectByID.concat(queryParamsByID)
        germplasmTrialQueryByID = []
        //console.log(finalQueryByID)
        resolve()
    },100))
    sequelize.query(finalQueryByID, { type:QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
      })
}

module.exports = {
    getGerminationTrials,
    getGerminationTrialByID
}