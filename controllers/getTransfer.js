const db = require("../models");
const Transfer = db.transfer
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

//standard query to return all records from transfers table. extra where params provided by user are added via named replacements
var transferSelect = `SELECT t.id, t.materialSample_catalogNumber, t.numberSamplesTransferred, t.transferDate, t.receivedDate, t.agencyTransferredTo, t.personTransferredTo, t.purposeNotes, t.returnedDate, t.numberSamplesReturned, t.createdAt, t.updatedAt, ms.materialSampleType, o.scientificName, ms.materialSample_recordNumber, ms.numberCollected, ms.numberAvailable, o.recordedBy, o.eventDate, o.stateProvince, o.county, o.locality, o.decimalLatitude, o.decimalLongitude FROM transfers AS t LEFT JOIN materialSamples as ms on t.materialSampleTableID = ms.id LEFT JOIN occurrences AS o on ms.occurrenceTableID = o.id WHERE t.id IS NOT NULL`

//function to define query and get transfers
async function getTransfer(req, res) {
    let whereClauses = [];
    let replacements = {};

    if (req.body.materialSample_catalogNumber !== '') {
        whereClauses.push(`AND t.materialSample_catalogNumber = :catalogNumber`);
        replacements.catalogNumber = req.body.materialSample_catalogNumber;
    }
    if (req.body.scientificName !== '') {
        whereClauses.push(`AND o.scientificName LIKE :scientificName`);
        replacements.scientificName = `%${req.body.scientificName}%`;
    }
    if (req.body.earlyDate !== '' && req.body.lateDate === '') {
        whereClauses.push(`AND t.transferDate BETWEEN :earlyDate AND '2300-01-01'`);
        replacements.earlyDate = req.body.earlyDate;
    }
    if (req.body.earlyDate !== '' && req.body.lateDate !== '') {
        whereClauses.push(`AND t.transferDate BETWEEN :earlyDate AND :lateDate`);
        replacements.earlyDate = req.body.earlyDate;
        replacements.lateDate = req.body.lateDate;
    }
    if (req.body.earlyDate === '' && req.body.lateDate !== '') {
        whereClauses.push(`AND t.transferDate BETWEEN '1900-01-01' AND :lateDate`);
        replacements.lateDate = req.body.lateDate;
    }
    if (req.body.agencyTransferredTo !== '') {
        whereClauses.push(`AND t.agencyTransferredTo LIKE :agencyTransferredTo`);
        replacements.agencyTransferredTo = `%${req.body.agencyTransferredTo}%`;
    }
    if (req.body.personTransferredTo !== '') {
        whereClauses.push(`AND t.personTransferredTo LIKE :personTransferredTo`);
        replacements.personTransferredTo = `%${req.body.personTransferredTo}%`;
    }
    if (req.body.materialSampleType !== '') {
        whereClauses.push(`AND ms.materialSampleType = :materialSampleType`);
        replacements.materialSampleType = req.body.materialSampleType;
    }

    const finalQuery = transferSelect.concat(' ', whereClauses.join(' '));
    console.log(finalQuery, replacements)

    sequelize.query(finalQuery, { replacements, type: QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Query failed" });
      })
}

module.exports = {
    getTransfer
}