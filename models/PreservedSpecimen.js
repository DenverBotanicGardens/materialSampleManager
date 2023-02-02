module.exports = (sequelize, Sequelize) => {
    const PreservedSpecimen = sequelize.define("preservedSpecimen", {
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

    return PreservedSpecimen;
};