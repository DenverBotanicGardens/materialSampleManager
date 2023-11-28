const db = require("../models");
const GermplasmViabilityTest = db.germplasmViabilityTest;
const MaterialSample = db.materialSample;
const Occurrence = db.occurrence;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

const query = "SELECT ms.materialSample_catalogNumber, ms.materialSample_recordNumber, ms.storageLocation, ms.disposition, ms.numberCollected, ms.numberAvailable, ms.sourcePlantCount, ms.preparationDate, ms.dateStored, o.recordedBy, o.eventDate, o.scientificName, o.stateProvince, o.county, o.locality, o.minimumElevationInMeters, o.permitURI, gvt.testConductedBy, gvt.endDate, gvt.numberSeedsTested, gvt.viabilityAdjustedGermination FROM materialSamples AS ms LEFT JOIN occurrences AS o ON ms.occurrenceTableID = o.id LEFT JOIN germplasmViabilityTests AS gvt ON ms.id = gvt.materialSampleTableID WHERE ms.materialSampleType = 'seed' AND gvt.endDate IS NULL OR gvt.endDate < DATE_SUB(CURDATE(), INTERVAL 5 YEAR)"