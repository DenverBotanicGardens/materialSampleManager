module.exports = (sequelize, Sequelize) => {
    const ViabilityTracking = sequelize.define("viabilityTracking", {
        numberGerminants : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        date : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        notes : {
            type : Sequelize.TEXT,
            allowNull : true
        },
        germplasmViabilityTestID : {
            type : Sequelize.INTEGER,
            allowNull : true,
            references : {
                model : "GermplasmViabilityTests",
                key : "id"
            }
        }
    },
    {
        freezeTableName: true
    });

    return ViabilityTracking;
};