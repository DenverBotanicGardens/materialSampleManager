const db = require("../models");
const Transfer = db.transfer
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;


async function addTransfer(req,res) {
    console.log(req.body)
    var insert = []

    for (let i = 0; i < req.body.length; i++){
        for(let k in req.body){
            if( req.body[k] === '' )
                delete req.body[k]
    //   const result = await Transfer.bulkCreate(insert)
    //   .then((data) => {
    //     res.send(data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
}
console.log(req.body)
}}

module.exports = {
    addTransfer
}
