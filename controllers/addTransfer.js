const db = require("../models");
const Transfer = db.transfer
const MaterialSample = db.materialSample
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

async function addTransfer(req, res) {
    const numberToTransfer = Number(req.body.numberSamplesTransferred);

    if (!numberToTransfer || numberToTransfer <= 0) {
        return res.status(400).send({ message: "Number of samples transferred must be a positive number" });
    }

    const t = await sequelize.transaction();

    try {
        const sample = await MaterialSample.findByPk(req.body.materialSampleTableID, { transaction: t, lock: t.LOCK.UPDATE });

        if (!sample) {
            await t.rollback();
            return res.status(404).send({ message: "Material sample not found" });
        }

        if (numberToTransfer > sample.numberAvailable) {
            await t.rollback();
            return res.status(400).send({
                message: `Cannot transfer ${numberToTransfer} samples — only ${sample.numberAvailable} available`
            });
        }

        const transferRecord = await Transfer.create({
            materialSampleTableID: req.body.materialSampleTableID,
            materialSample_catalogNumber: req.body.materialSample_catalogNumber,
            numberSamplesTransferred: numberToTransfer,
            transferDate: req.body.transferDate,
            receivedDate: req.body.receivedDate,
            agencyTransferredTo: req.body.agencyTransferredTo,
            personTransferredTo: req.body.personTransferredTo,
            purposeNotes: req.body.purposeNotes
        }, { transaction: t });

        await sample.update(
            { numberAvailable: sample.numberAvailable - numberToTransfer },
            { transaction: t }
        );

        await t.commit();
        res.send(transferRecord);

    } catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).send({ message: "Could not process transfer" });
    }
}

module.exports = {
    addTransfer
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