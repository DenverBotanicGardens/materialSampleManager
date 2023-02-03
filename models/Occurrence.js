module.exports = (sequelize, Sequelize) => {
    const Occurrence = sequelize.define("occurrence", {
        occurrenceID : {
            type : Sequelize.STRING,
            allowNull : true
            },
        recordedBy : {
            type : Sequelize.STRING,
            allowNull : true
            },
        eventDate : {
            type : Sequelize.DATEONLY,
            allowNull : true
            },
        scientificName : {
            type : Sequelize.STRING,
            allowNull : true
            },
        identifiedBy : {
            type : Sequelize.STRING,
            allowNull : true
            },
        dateIdentified : {
            type : Sequelize.DATEONLY,
            allowNull : true
            },
        associatedTaxa : {
            type : Sequelize.STRING,
            allowNull : true
            },
        reproductiveCondition : {
            type : Sequelize.STRING,
            allowNull : true
            },
        occurrenceRemarks : {
            type : Sequelize.TEXT,
            allowNull : true
            },
        habitat : {
            type : Sequelize.TEXT,
            allowNull : true
            },
        country : {
            type : Sequelize.STRING,
            allowNull : true
            },
        stateProvince : {
            type : Sequelize.STRING,
            allowNull : true
            },
        county : {
            type : Sequelize.STRING,
            allowNull : true
            },
        locality : {
            type : Sequelize.TEXT,
            allowNull : true
            },
        locationRemarks : {
            type : Sequelize.TEXT,
            allowNull : true
            },
        locationID : {
            type : Sequelize.STRING,
            allowNull : true
            },
        decimalLatitude : {
            type : Sequelize.STRING,
            allowNull : true
            },
        decimalLongitude : {
            type : Sequelize.STRING,
            allowNull : true
            },
        minimumElevationInMeters : {
            type : Sequelize.STRING,
            allowNull : true
            },
        permitURI : {
            type : Sequelize.STRING,
            allowNull : true
            },
        // projectTableID : {
        //     type : Sequelize.INTEGER,
        //     allowNull : true,
        //     references : {
        //         model : "projects",
        //         key : "id"
        //         }
        //     },
        eventTableID : {
            type : Sequelize.INTEGER,
            allowNull : true,
            references : {
                model : "events",
                key : "id"
                }
            }
    });

    Occurrence.associate = (models) => {
        Occurrence.hasMany(models.materialSample, {
            foreignKey: 'occurrenceTableID'
        })
    }

    return Occurrence;
};