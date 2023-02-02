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

db.materialSampleManager = require("./Project.js")(sequelize, Sequelize);
db.materialSampleManager = require("./Events.js")(sequelize, Sequelize);
db.materialSampleManager = require("./Occurrences.js")(sequelize, Sequelize);
db.materialSampleManager = require("./MaterialSamples.js")(sequelize, Sequelize);
db.materialSampleManager = require("./PreservedSpecimens.js")(sequelize, Sequelize);
db.materialSampleManager = require("./Transfers.js")(sequelize, Sequelize);
db.materialSampleManager = require("./GermplasmViabilityTests.js")(sequelize, Sequelize);
db.materialSampleManager = require("./ViabilityTracking.js")(sequelize, Sequelize);



module.exports = db;