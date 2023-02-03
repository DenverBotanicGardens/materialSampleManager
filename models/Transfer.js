module.exports = (sequelize, Sequelize) => {
    const Transfer = sequelize.define("transfer", {
        materialSample_catalogNumber : {
            type : Sequelize.STRING,
            allowNull : true
        },
        numberSamplesTransferred : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        transferDate : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        receivedDate : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        agencyTransferredTo : {
            type : Sequelize.STRING,
            allowNull : true
        },
        personTransferredTo : {
            type : Sequelize.STRING,
            allowNull : true
        },
        purposeNotes : {
            type : Sequelize.STRING,
            allowNull : true
        },
        returnedDate : {
            type : Sequelize.DATEONLY,
            allowNull : true
        },
        numberSamplesReturned : {
            type : Sequelize.INTEGER,
            allowNull : true
        }
    });

    return Transfer;
};