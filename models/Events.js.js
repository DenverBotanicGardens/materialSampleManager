module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("events", {
        eventID : Sequelize.STRING,
        projectTableID : Sequelize.INTEGER
    });

    return Events;
};