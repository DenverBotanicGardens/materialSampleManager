module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("Project", {
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

    return Project;
};