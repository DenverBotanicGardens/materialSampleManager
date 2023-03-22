const db = require("../models");
const Transfer = db.transfer

async function updateTransfer(req,res) {
    var set = {}
    if (req.body.materialSample_catalogNumber){
      set.materialSample_catalogNumber = req.body.materialSample_catalogNumber
    }
    if (req.body.numberSamplesTransferred){
      set.numberSamplesTransferred = req.body.numberSamplesTransferred
    }
    if (req.body.transferDate){
      set.transferDate = req.body.transferDate
    }
    if (req.body.receivedDate){
      set.receivedDate = req.body.receivedDate
    }
    if (req.body.agencyTransferredTo){
        set.agencyTransferredTo = req.body.agencyTransferredTo
      }
    if (req.body.personTransferredTo){
    set.personTransferredTo = req.body.personTransferredTo
    }
    if (req.body.purposeNotes){
        set.purposeNotes = req.body.purposeNotes
      }
    if (req.body.returnedDate){
        set.returnedDate = req.body.returnedDate
    }
    if (req.body.numberSamplesReturned){
    set.numberSamplesReturned = req.body.numberSamplesReturned
    }
    console.log(set)
      const result = await Transfer.update(set,{
          where: {
              id: req.body.id
          }
      })
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log(err);
      })
    
    }
    
    module.exports = {
        updateTransfer
  }