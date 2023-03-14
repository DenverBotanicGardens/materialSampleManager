module.exports = (sequelize, Sequelize) => {
    const GermplasmViabilityTest = sequelize.define("germplasmViabilityTest", {
        materialSample_catalogNumber : {
            type : Sequelize.STRING,
            allowNull : true
        },
        testConductedBy : {
            type : Sequelize.STRING,
            allowNull : true
        },
        sampleStored : {
            type : Sequelize.BOOLEAN,
            allowNull : true
        },
        medium : {
            type : Sequelize.STRING,
            allowNull : true
        },
        scarified : {
            type : Sequelize.BOOLEAN,
            allowNull : true
        },
        stratificationTemperature : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        stratificationStartDate : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        incubationStartDate : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        endDate : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        numberSeedsTested : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        incubationTempDay : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        incubationTempNight : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        numberDead : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        numberViable : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        totalGerminants : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        viabilityAdjustedGermination : {
            type : Sequelize.FLOAT,
            allowNull : true
        },
        materialSampleID : {
            type : Sequelize.STRING,
            allowNull : true
        }
    });

    GermplasmViabilityTest.associate = (models) => {
        GermplasmViabilityTest.hasMany(models.viabilityTracking, {
            foreignKey: 'germplasmViabilityTestID'
        })
    }
    return GermplasmViabilityTest;
};