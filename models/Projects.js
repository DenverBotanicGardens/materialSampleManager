module.exports = (sequelize, Sequelize) => {
    const Projects = sequelize.define("projects", {
        project : {
            type : Sequelize.STRING,
            allowNull : false
        },
        principalInvestigator : {
            type : Sequelize.STRING,
            allowNull : true
        },
        dbgContact : {
            type : Sequelize.STRING,
            allowNull : true
        },
        PIemail : {
            type : Sequelize.STRING,
            allowNull : true,
            validate : {
                isEmail: true
                }
        }
    });

    return Projects;
};