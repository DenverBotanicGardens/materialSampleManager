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
        }
    },
    {
        freezeTableName: true
    });

    return ViabilityTracking;
};