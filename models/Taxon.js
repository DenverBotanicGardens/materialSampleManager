module.exports = (sequelize, Sequelize) => {
    const Taxon = sequelize.define("taxon", {
        taxonID : {
            type : Sequelize.STRING,
            allowNull : true
        },
        nameAccordingTo : {
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

    Taxon.associate = (models) => {
        Taxon.hasOne(models.occurrence, {
            foreignKey: 'taxonTableID'
        })
    }
    
    return Project;
};