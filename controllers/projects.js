//dependencies
const db = require("../models/Projects");
const Projects = db.projects;
const fs = require("fs");
const { Op } = require("sequelize");
//const csv = require("fast-csv");
//const baseUrl = "http://localhost:8080/files/";

//---------------------------------------------------------------------------------------------------------------
//add a new project tot he projects table
const addProject = (req,res) => {
    let data = {
        project: req.body.project,
        principalInvestigator: req.body.principalInvestigator,
        dbgContact: req.body.dbgContact,
        PIemail: req.body.PIemail
    }
    Projects.create(data)
    .then(data => {
    res.send(data)
    })
    .catch(err => res.status(500).json(err))
}


module.exports = {
    addProject
  };
