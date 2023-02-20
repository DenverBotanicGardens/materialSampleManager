var Occurrence = function (recordedBy,eventDate,scientificName,identifiedBy,dateIdentified,associatedTaxa,reproductiveCondition,occurrenceRemarks,habitat,country,stateProvince,county,locality,locationRemarks,locationID,decimalLatitude,decimalLongitude,minimumElevationInMeters,permitURI,materialSampleID,materialSampleType,materialSample_catalogNumber,materialSample_recordNumber,storageLocation,disposition,numberCollected,numberAvailable,sourcePlantCount,preparationDate,dateStored,catalogNumber,recordNumber)
    {
        this.recordedBy = recordedBy;
        this.eventDate = eventDate;
        this.scientificName = scientificName;
        this.identifiedBy = identifiedBy
        this.dateIdentified = dateIdentified 
        this.associatedTaxa = associatedTaxa
        this.reproductiveCondition = reproductiveCondition
        this.occurrenceRemarks = occurrenceRemarks
        this.habitat = habitat
        this.country = country
        this.stateProvince = stateProvince
        this.county = county
        this.locality = locality
        this.locationRemarks = locationRemarks
        this.locationID = locationID
        this.decimalLatitude = decimalLatitude
        this.decimalLongitude = decimalLongitude
        this.minimumElevationInMeters = minimumElevationInMeters
        this.permitURI = permitURI
        this.materialSample = {
            materialSampleID : materialSampleID,
            materialSampleType : materialSampleType,
            materialSample_catalogNumber : materialSample_catalogNumber,
            materialSample_recordNumber : materialSample_recordNumber,
            storageLocation : storageLocation,
            disposition : disposition,
            numberCollected : numberCollected,
            numberAvailable : numberAvailable,
            sourcePlantCount : sourcePlantCount,
            preparationDate : preparationDate,
            dateStored : dateStored
        }
        this.preservedSpecimen= {
            catalogNumber : catalogNumber,
            recordNumber : recordNumber
        }
    }
    

module.exports = Occurrence