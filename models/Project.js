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
    
    })

    Project.associate = (models) => {
        Project.hasMany(models.occurrence, {
            foreignKey: 'projectTableID'
        })
        Project.hasMany(models.event, {
            foreignKey: 'projectTableID'
        })
    }
    
    return Project;
};

