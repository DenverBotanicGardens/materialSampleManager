module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
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

    return Event;
};