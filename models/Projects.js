module.exports = (sequelize, Sequelize) => {
    const Projects = sequelize.define("projects", {
        project : {
            type : Sequelize.STRING,
            allowNull : false,
             
        principalInvestigator : Sequelize.STRING,
        dbgContact : Sequelize.STRING,
        PIemail : Sequelize.STRING
    });

    return Projects;
};