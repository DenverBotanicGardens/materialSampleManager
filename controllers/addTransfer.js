const db = require("../models");
const Transfer = db.transfer
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

async function addTransfer(req,res) {
    console.log(req.body.length)
    var insert = req.body.map(function(transferItem){
        if (req.body.materialSample_catalogNumber){
            numberSamplesTransferred: transferItem.materialSample_catalogNumber
          }
        if (req.body.numberSamplesTransferred){
            numberSamplesTransferred: transferItem.numberSamplesTransferred
          }
        if (req.body.transferDate){
            transferDate: transferItem.transferDate
          }
        if (req.body.receivedDate){
            receivedDate: transferItem.receivedDate
          }
        if (req.body.agencyTransferredTo){
            agencyTransferredTo: transferItem.agencyTransferredTo
          }
        if (req.body.personTransferredTo){
            personTransferredTo: transferItem.personTransferredTo
          }
        if (req.body.purposeNotes){
            purposeNotes: transferItem.purposeNotes
          }
        if (req.body.returnedDate){
            returnedDate: transferItem.returnedDate
          }
        if (req.body.numberSamplesReturned){
            numberSamplesReturned: transferItem.numberSamplesReturned
          }
        if (req.body.materialSampleTableID){
            materialSampleTableID: transferItem.materialSampleTableID
          }
    })


    // for (let i = 0; i < req.body.length; i++){
    //     if (req.body.materialSample_catalogNumber){
    //         insert.materialSample_catalogNumber = req.body[i].materialSample_catalogNumber
    //       }
    //       if (req.body[i].numberSamplesTransferred){
    //         insert[i].numberSamplesTransferred = req.body[i].numberSamplesTransferred
    //       }
    //       if (req.body[i].transferDate){
    //         insert[i].transferDate = req.body[i].transferDate
    //       }
    //       if (req.body[i].receivedDate){
    //         insert[i].receivedDate = req.body[i].receivedDate
    //       }
    //       if (req.body[i].agencyTransferredTo){
    //         insert[i].agencyTransferredTo = req.body[i].agencyTransferredTo
    //       }
    //       if (req.body[i].personTransferredTo){
    //         insert[i].personTransferredTo = req.body[i].personTransferredTo
    //       }
    //       if (req.body[i].purposeNotes){
    //         insert[i].purposeNotes = req.body[i].purposeNotes
    //       }
    //       if (req.body[i].returnedDate){
    //         insert[i].returnedDate = req.body[i].returnedDate
    //       }
    //       if (req.body[i].numberSamplesReturned){
    //         insert[i].numberSamplesReturned = req.body[i].numberSamplesReturned
    //       }
    //       if (req.body[i].materialSampleTableID){
    //         insert[i].materialSampleTableID = req.body[i].materialSampleTableID
    //       }
    // }
      console.log(insert)
    //   const result = await Transfer.bulkCreate(insert)
    //   .then((data) => {
    //     res.send(data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
}

module.exports = {
    addTransfer
}
