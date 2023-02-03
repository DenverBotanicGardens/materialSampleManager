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
        recordNumber : {
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
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        dateStored : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        storageLocation : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        source_materialSampleTableID : {
            type : Sequelize.INTEGER,
            allowNull : true,
            references : {
                model : "materialSamples",
                key : "id"
            }
        },             
        source_preservedSpecimenTableID : {
            type : Sequelize.INTEGER,
            allowNull : true,
            references : {
                model : "preservedSpecimens",
                key : "id"
            }
        }
        // ,
        // occurrenceTableID : {
        //     type : Sequelize.INTEGER,
        //     allowNull : true,
        //     references : {
        //         model : "occurrences",
        //         key : "id"
        //     }
        // }                
    });

    return MaterialSample;
};