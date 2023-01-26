module.exports = (sequelize, Sequelize) => {
    const PreservedSpecimens = sequelize.define("preservedSpecimens", {
        catalogNumber : {
            type : Sequelize.STRING,
            allowNull : true
            },
        recordNumber : {
            type : Sequelize.STRING,
            allowNull : true
            },
        occurrenceTableID : {
            type : Sequelize.INTEGER,
            allowNull : true,
            references : {
                model : "occurrences",
                key : "id"
                }
            }
    });

    return PreservedSpecimens;
};