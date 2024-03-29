const db = require("../models");
const Transfer = db.transfer
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

async function addTransfer(req,res) {
    const result = await Transfer.create({
        materialSampleTableID: req.body.materialSampleTableID,
        materialSample_catalogNumber: req.body.materialSample_catalogNumber,
        numberSamplesTransferred: req.body.numberSamplesTransferred,
        transferDate: req.body.transferDate,
        receivedDate: req.body.receivedDate,
        agencyTransferredTo: req.body.agencyTransferredTo,
        personTransferredTo: req.body.personTransferredTo,
        purposeNotes: req.body.purposeNotes
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    })
  
  }

  //this was for adding lots of transfers at one, may use int he future
// async function addTransfer(req,res) {
//     var insertInto = []
//     var insert = {}
//     for (let i = 0; i < req.body.length; i++){
//         if (req.body[i].materialSample_catalogNumber){
//             insert.materialSample_catalogNumber = req.body[i].materialSample_catalogNumber
//             }
//         if (req.body[i].numberSamplesTransferred){
//             insert.numberSamplesTransferred = req.body[i].numberSamplesTransferred
//             }
//         if (req.body[i].transferDate){
//             insert.transferDate = req.body[i].transferDate
//             }
//         if (req.body[i].receivedDate){
//             insert.receivedDate = req.body[i].receivedDate
//             }
//         if (req.body[i].agencyTransferredTo){
//             insert.agencyTransferredTo = req.body[i].agencyTransferredTo
//             }
//         if (req.body[i].personTransferredTo){
//             insert.personTransferredTo = req.body[i].personTransferredTo
//             }
//         if (req.body[i].purposeNotes){
//             insert.purposeNotes = req.body[i].purposeNotes
//             }
//         if (req.body[i].materialSampleTableID){
//             insert.materialSampleTableID = req.body[i].materialSampleTableID
//             }
//         insertInto.push(insert)
//     }
//       const result = await Transfer.bulkCreate(insertInto)
//       .then((data) => {
//         res.send(data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
// }

module.exports = {
    addTransfer
}
