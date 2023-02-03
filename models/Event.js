module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        eventID : {
            type : Sequelize.STRING,
            allowNull : true
        }
    });

    Event.associate = (models) => {
        Event.hasMany(models.occurrence, {
            foreignKey: 'eventTableID'
        })
        Event.hasMany(models.event, {
            foreignKey: 'parentEventTableID'
        })
    }

    return Event;
};