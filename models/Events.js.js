module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("events", {
        eventID : {
            type : Sequelize.STRING,
            allowNull : true
        },
        projectTableID : {
            type : Sequelize.INTEGER,
            allowNull : true,
            references : {
                model : "projects",
                key : "id"
            }
        }
    });

    return Events;
};