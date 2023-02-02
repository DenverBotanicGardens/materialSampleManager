module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        project : {
            type : Sequelize.STRING,
            allowNull : true
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