const db = require("../models");
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const PreservedSpecimen = db.preservedSpecimen;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

var seedQuery = [`SELECT * FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id WHERE ms.materialSampleType = 'seed'`]

async function getSeedsForTrial(req, res) {
    await new Promise(resolve => setTimeout(() => {
        if (req.body.materialSample_catalogNumber !== '') {
            seedQuery.push(` AND ms.materialSample_catalogNumber = '${req.body.materialSample_catalogNumber}'`);
        }

        if (req.body.scientificName !== '') {
            seedQuery.push(` AND o.scientificName = '${req.body.scientificName}'`);
        }

        if (req.body.earlyDate !== '' && req.body.lateDate === '') {
            seedQuery.push(` AND .eventDate BETWEEN '${req.body.earlyDate}' AND '2300-01-01'`)
        }

        if (req.body.earlyDate !== '' && req.body.lateDate !== '') {
            seedQuery.push(` AND o.eventDate BETWEEN '${req.body.earlyDate}' AND '${req.body.lateDate}'`)
        }

        if (req.body.earlyDate === '' && req.body.lateDate !== '') {
            seedQuery.push(` AND o.eventDate BETWEEN '1900-01-01' AND '${req.body.lateDate}'`)
        }
        fullSeedQuery = seedQuery.join()
        finalQuery = fullSeedQuery.replaceAll(',','')
        seedQuery = [`SELECT * FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id WHERE ms.materialSampleType = 'seed'`]
        resolve()
    },1000))
    console.log(finalQuery)
    sequelize.query(finalQuery, { type:QueryTypes.SELECT })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
      })
}
    
    
    


// const getSeedsForTrial = (req, res) => {
//     MaterialSample.findAll(
//         {
//             where: {
//                 [Op.and]:
//                 [
//                 {materialSampleType: 'seed'},
//                 {materialSample_catalogNumber: req.body.materialSample_catalogNumber}
//                 ]
//             },
//             include: [{
//                 model: Occurrence,
//                 where: {
//                     [Op.or]:
//                     [{scientificName: req.body.scientificName},
//                    [
//                     {eventDate: {
//                         [Op.between]: [req.body.earlyDate, req.body.lateDate]
//                         }
//                     }
//                 ]]
//             }}]
// }
// )
// .then((data) => {
//     res.send(data)
// })
// .catch((err) => {
//     console.log(err)
//     })
// }

module.exports = {
    getSeedsForTrial
  };
