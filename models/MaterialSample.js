module.exports = (sequelize, Sequelize) => {
    const MaterialSample = sequelize.define("materialSample", {
        materialSampleID : {
            type : Sequelize.STRING,
            allowNull : true
        },
        materialSampleType : {
            type : Sequelize.STRING,
            allowNull : true
        },
        materialSample_catalogNumber : {
            type : Sequelize.STRING,
            allowNull : true
        },
        materialSample_recordNumber : {
            type : Sequelize.STRING,
            allowNull : true
        },
        storageLocation : {
            type : Sequelize.STRING,
            allowNull : true
        },
        disposition : {
            type : Sequelize.STRING,
            allowNull : true
        },
        numberCollected : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        numberAvailable : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        sourcePlantCount : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        preparationDate : {
            type : Sequelize.STRING,
            allowNull : true
        },
        dateStored : {
            type : Sequelize.STRING,
            allowNull : true
        }
    });

    MaterialSample.associate = (models) => {
        MaterialSample.hasMany(models.transfer, {
            foreignKey: 'materialSampleTableID'
        })
        MaterialSample.hasMany(models.germplasmViabilityTest, {
            foreignKey: 'materialSampleTableID'
        })
        MaterialSample.hasMany(models.materialSample, {
            foreignKey: 'sourceMaterialSampleTableID'
        })
        MaterialSample.belongsTo(models.occurrence, {
            foreignKey: 'occurrenceTableID'
        })
    }
    return MaterialSample;
};