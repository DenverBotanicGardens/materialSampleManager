const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const { response } = require("express");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.project = require("./Project.js")(sequelize, Sequelize);
db.event = require("./Event.js")(sequelize, Sequelize);
db.occurrence = require("./Occurrence.js")(sequelize, Sequelize);
db.materialSample = require("./MaterialSample.js")(sequelize, Sequelize);
db.preservedSpecimen = require("./PreservedSpecimen.js")(sequelize, Sequelize);
db.transfer = require("./Transfer.js")(sequelize, Sequelize);
db.germplasmViabilityTest = require("./GermplasmViabilityTest.js")(sequelize, Sequelize);
db.viabilityTracking = require("./ViabilityTracking.js")(sequelize, Sequelize);


//set up table associations
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]){
    //call the associate function and pass reference to all other models
    db[modelName].associate(db)
  }
})

module.exports = db;