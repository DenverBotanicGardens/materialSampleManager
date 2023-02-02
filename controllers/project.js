//dependencies
const db = require("../models");
const Project = db.project;
//const fs = require("fs");
//const { Op } = require("sequelize");
//const Sequelize = require('sequelize');
//const csv = require("fast-csv");
//const baseUrl = "http://localhost:8080/files/";


//---------------------------------------------------------------------------------------------------------------
//add a new project to the projects table
const addProject = (req,res) => {
    Project.create({
        project: req.body.project,
        principalInvestigator: req.body.principalInvestigator,
        dbgContact: req.body.dbgContact,
        PIemail: req.body.PIemail
    })
    .then((data) => {
    res.send(data)
    })
    .catch(err => res.status(500).json(err))
}

//select all projects form the project table
const getAllProjects = (req,res) => {
    Project.findAll(
    )
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "There was an error retrieving projects"
        })
    })
}




module.exports = {
    addProject,
    getAllProjects
  };
