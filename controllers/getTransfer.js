const db = require("../models");
const Transfer = db.transfer
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

//empty array to populate with parameters that make up where clause
var transferQuery = []
//standard query to return all records from transfers table. extra where params provided by user are concatted to the end of this string
var transferSelect = `SELECT t.id, t.materialSample_catalogNumber, t.numberSamplesTransferred, t.transferDate, t.receivedDate, t.agencyTransferredTo, t.personTransferredTo, t.purposeNotes, t.returnedDate, t.numberSamplesReturned, t.createdAt, t.updatedAt, ms.materialSampleType, o.scientificName, ms.materialSample_recordNumber, ms.numberCollected, ms.numberAvailable, o.recordedBy, o.eventDate, o.stateProvince, o.county, o.locality, o.decimalLatitude, o.decimalLongitude FROM transfers AS t LEFT JOIN materialSamples as ms on t.materialSampleTableID = ms.id LEFT JOIN occurrences AS o on ms.occurrenceTableID = o.id WHERE t.id IS NOT NULL`

//function to define query and get transfers
async function getTransfer(req, res) {
    await new Promise(resolve => setTimeout(() => {
        if (req.body.materialSample_catalogNumber !== '') {
            transferQuery.push(` AND t.materialSample_catalogNumber = '${req.body.materialSample_catalogNumber}'`);
        }
        if (req.body.scientificName !== '') {
            transferQuery.push(` AND o.scientificName LIKE '%${req.body.scientificName}%'`);
        }
        if (req.body.earlyDate !== '' && req.body.lateDate === '') {
            transferQuery.push(` AND t.transferDate BETWEEN '${req.body.earlyDate}' AND '2300-01-01'`)
        }
        if (req.body.earlyDate !== '' && req.body.lateDate !== '') {
            transferQuery.push(` AND t.transferDate BETWEEN '${req.body.earlyDate}' AND '${req.body.lateDate}'`)
        }
        if (req.body.earlyDate === '' && req.body.lateDate !== '') {
            transferQuery.push(` AND t.transferDate BETWEEN '1900-01-01' AND '${req.body.lateDate}'`)
        }
        if (req.body.agencyTransferredTo !== ''){
            transferQuery.push(` AND t.agencyTransferredTo LIKE '%${req.body.agencyTransferredTo}%'`)
        }
        if (req.body.personTransferredTo !== ''){
            transferQuery.push(` AND t.personTransferredTo LIKE '%${req.body.personTransferredTo}%'`)
        }
        if (req.body.materialSampleType !== ''){
            transferQuery.push(` AND ms.materialSampleType = '${req.body.materialSampleType}'`)
        }
        fullTransferQuery = transferQuery.join()
        queryParams = fullTransferQuery.replaceAll(',','')
        finalQuery = transferSelect.concat(queryParams)
        transferQuery = []
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

module.exports = {
    getTransfer
}