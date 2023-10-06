$(document).ready(function() {
    //--------------------------------------------------------------------------------------------------
    //GLOBAL VARIABLES
    //--------------------------------------------------------------------------------------------------
    //Search Form
    //an object to contain the values entered by the user into the form on the Search page
    let searchFormEntires = {}
    
    // //New Project Form
    // //an object to contain the values entered by the user into the form to create a new project
    // let newProjectFormEntries = {}
    
    //Projects List
    //an array that contains all projects from the database. to be displayed on the list on the projects page and in the dropdown selection on the upload data page.
    let projectsList = []

    //Project Selection
    //an array to contain the project selected on the upload data page, for the data uploaded to be a part of.
    let projectSelection = []
    
    //Search Germination Trials Form
    //an object to contain the values entered by the user in the search for germination trials form on the germination trials page.
    let searchGermTrialsFormEntries = {}

    //Germination Trials Search Results
    //an array of objects to contain the list of germination trials retured to the user based upon their query
    let germinationTrialResultList = []

    //Search for Seed to add to Germinamtion Trial Form
    //an object to contain the values entered by the user in the search for seed to add to trial form on the create new germination trial page.
    let searchSeedForGermTrialFormEntries = {}

    //Seed for Germination Trial List
    //an array to contain the list of seeds provided after a search is conducted on the create new germination trial page.
    let seedForGerminationTrial = []

    //New Germination Trial Form
    //an object to contain the values entered by the user in the new trial form on the the create new germintaion trial page.
    let newGermTrialFormEntries = {}

    //Add Viability Tracking Form
    //an object to contain the values entered by the user in the add viability tracking data form on the add viability tracking page.
    let addViabilityTrackingFormEntries = {}

    //Germintaion Trial Metadata while Tracking Viability
    //an object to contain the metadata describing the Germination Trial so that it can be viewed and referenced byt he user while adding viability tracking
    let germinationTrialMetadataTracking = {}

    
    //Search For Transfers Form
    //an object to contain the values entered by the user in the search for transfers form on the transfers page
    let searchTransfersFormEntries = {}
    
    //Transfers Result List
    //an array of objects to contain the transfer records returned based on the query submitted by the user
    let transferSearchResults = []
    
    //Search for Material Samples to Transfer Form
    //an object to contain the values entered byt he user in the seach for material sample to transfer form on the transfer material sample page
    let searchSamplesToTransferFormEntries = {}
    
    //Material Samples for Transfer
    //an array of objects to contain the results from the search for material samples to transfer ont he transfer material sample page
    let materialSamplesToTransferSearchResults = []
    
    //New Transfer Form
    //an object to contain the values entered by the user in the record transfer information here form on the transfer material sample page
    let newTransferFormEntries = {}
    
    //Update Transfer Form
    //an object to contain the values entered by the user in the update material sample transfer form on the update transfer page
    let updatTransferFormEntries = {}
    
    //Search for Material Sample to Update Form
    //an object to contain the values entered by the user in the search for material samples to update form on the update material sample page
    let searchSamplesToUpdateFormEntries = {}
    
    //Material Samples to Update
    //an array of objects to contain the material sample records returned based on the query submitted by the user on the update material sample page
    let materialSamplesToUpdateSearchResults = []
    
    //Update Material Sample Form
    //an object to contian the values entered by the user in the sample updates form on the update material sample page
    let updateMaterialSampleFormEntries = {}
    
    //Seed sample selected for Germination Trial
    //variables to hold the id and catalogNumber for the seed sample selected for a new germination trial
    let seedSampleSelectedID
    let seedSampleSelectedCatalogNumber
    
    //Filename for CSV containing Germination Trial Results Data that is to be downloaded by the client
    let germinationTrialResultsCSVFileName
    
    //Germination Trial Sellected for Add Viability Tracking
    let germinationTrialIDSelectedAddViability
    let getOneGermTrialQuery = {}
    let germinationTrialIDForAddingViabilityTracking
    let newAddViabilityTrackingFormEntries ={}
    
    //Germination Trial Selected for Finishing Trial
    let germinationTrialIDSelectedFinish
    let germinationTrialIDForFinishingTrial
    let newFinishTrialFormEntries ={}


    //--------------------------------------------------------------------------------------------------
    // EVENT LISTENERS (more at bottom of script)
    //--------------------------------------------------------------------------------------------------
    //Hide Elements
    //Search Page
    $('#searchResults').hide()
    
    //Germination Trials Page
    $('#searchGermTrialResults').hide()
    $("#addViabilityTrackingFormAndMetadata").hide()
    $("#finishGerminationTrialFormAndMetadata").hide()
    
    //Create New Germination Trial Page
    $('#seedSearchGermTrialResults').hide()
    $('#newGermTrialDataForm').hide()
    
    //Transfers Page
    $('#searchTransfersResults').hide()

    //New Transfer Page
    $('#searchMaterialSampleToTransferResults').hide()
    $('#newTransferDataForm').hide()

    //Update Material Sample Page
    $('#searchSamplesToUpdateResults').hide()
    $('#sampleUpdatesForm').hide()




//Buttons to Execute Functions
    //Execute Search

    //Download Search Results to CSV


    //Submit New Project


    //Upload CSV File


    //Execute Search for Germination Trials


    //Download Germinations Trials to CSV
    $("#downloadGerminationTrialRecordsResults").on("click", function(){
        exportGermTrialResults()
    })

    //Select Germination Trial to Add Viability Tracking To
    

    //Submit Add Viability Tracking Data Form


    //Select Germination Trial to Finish


    //Submit Finish Germiation Trial Form


    //Execute Search for seed to Use in Germination Trial

    
    //Select Seed to Create New Germinaiton Trial


    //Submit New Germination Trial Form


    //Execute Search for Transfers


    //Select Transfer to Update


    //Submit Transfer Update Form


    //Execute Search for Samples to Transfer


    //Select Sample to Transfer


    //Submit New Transfer Form


//--------------------------------------------------------------------------------------------------
//FUNCTIONS
//--------------------------------------------------------------------------------------------------

//Search Material Samples
    //add user entries to searchFormEntires object
    //send to backend via api
    //return results
    //display results in list


//Download Material Sample Records To CSV

//--------------------------------------------------------------------------------------------------
//SUBMIT NEW PROJECT
//--------------------------------------------------------------------------------------------------
    //add user entries to newProjectFormEntries object
    let projectInput = $("#project")
    let principalInvestigatorInput = $("#principalInvestigator")
    let dbgContactInput = $("#dbgContact")
    let PIemailInput = $("#PIemail")
    let projectForm = $("#projectForm")
    $(projectForm).on("submit", function handleFormSubmit(event){
        event.preventDefault()
        if (!projectInput.val().trim() || !principalInvestigatorInput.val().trim() || !PIemailInput.val().trim() || !dbgContactInput.val().trim()){
            alert("Please provide a value for each field and be sure that the PI Email is a valid email address")
        }
        let newProjectFormEntries = {
            project: projectInput.val().trim(),
            principalInvestigator: principalInvestigatorInput.val().trim(),
            PIemail: PIemailInput.val().trim(),
            dbgContact: dbgContactInput.val().trim()
        }
        submitProject(newProjectFormEntries)
    })
    
    const submitProject = (project) => {
        $.post("api/project", project, function(){
            window.location.reload();
        })
    }     

//--------------------------------------------------------------------------------------------------
//DISPLAY EXISTING PROJECTS ON PROJECTS PAGE
//--------------------------------------------------------------------------------------------------
    //retrieve all projects via api
    //add all results to a projectsList array
    //append each item in array to the list id = #projects
    const fetchProjects = () => {
        $.ajax({
            method: "GET",
            url: "/api/project"
        })
        .then((projects) => {
            projectsList = []
            $.each(projects, function(i, projectItem) {
                projectsList.push('<li class="list-group-item">' + projectItem.project + ' | '+ projectItem.principalInvestigator + ' | '+ projectItem.PIemail + ' | '+ projectItem.dbgContact + '</li>')
            });
        })
        .then(function(){
            $('#projects').append(projectsList.join(''))           
        })
        .catch((error) => {
            console.error(error);
        })
    }

//--------------------------------------------------------------------------------------------------
//DISPLAY EXISTING PROJECTS IN DROPDOWN SELECT LIST ON UPLOAD DATA PAGE
//--------------------------------------------------------------------------------------------------
    //retrieve all projects via api
    //add all results to projectSelection array
    const listProjectsForUpload = () => {
        $.ajax({
            method: "GET",
            url: "/api/project"
        })
        .then((projects) => {
            projectsListUpload = []
            $.each(projects, function(i, projectItemUpload) {
                projectsListUpload.push('<option value='+projectItemUpload.id+'>' + projectItemUpload.project + ' | '+ projectItemUpload.principalInvestigator + '</option>')
            });
        })
        .then(function(){
            $('#projectsUpload').append(projectsListUpload.join(''))           
        })
        .catch((error) => {
            console.error(error);
        })
    }
//--------------------------------------------------------------------------------------------------------------------------------------------------
//UPLOAD MATERIAL SAMPLES VIA CSV
//--------------------------------------------------------------------------------------------------------------------------------------------------
//Capture id For Selected Project
    // send to backend csvUplaod controller to be incorporated into data being uploaded
    const sendProjectID = () => {
        let projectIDForServer = {projectTableID: $('#projectsUpload').val()}
        console.log(projectIDForServer)
        $.ajax({
            url: "/api/projectIDFromClient",
            type: "POST",
            data: projectIDForServer,
            success: function(){
                console.log("project id sent to server")
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
//Send projectID and csv to backend for upload to database
    $('#uploadCSV').submit(function(e) {
        e.preventDefault()
        sendProjectID()
        var formdata = new FormData(this);

        $.ajax({
        url: "/api/upload",
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false
        })
        .then((data) => {
            if (data.success) {
                //File upload was successful
                alert(data.message)
            } else {
                //File upload failed
                alert("Error:" + data.message)
            }
        })
        .catch((error) => {
            console.error(error);
            alert("An error occurred while uploading this file. Please contact the Scientific Data Manager.")
        })
        return false;
    });

//--------------------------------------------------------------------------------------------------
//SEARCH GERMINATION TRIALS
//--------------------------------------------------------------------------------------------------    
    //add user entries to searchGermTrialsFormEntries object
    let germSearchProjectInput = $("#germSearchProject")
    let germSearchScientificNameInput = $("#germSearchScientificName")
    let germSearchCatalogNumberInput = $("#germSearchCatalogNumber")
    let germSearchStratificationEarlyDateInput = $("#germSearchStratificationEarlyDate")
    let germSearchStratificationLateDateInput = $("#germSearchStratificationLateDate")
    let germSearchEndEarlyDateInput = $("#germSearchEndEarlyDate")
    let germSearchEndLateDateInput = $("#germSearchEndLateDate")
    let germSearchEventEarlyDateInput = $("#germSearchEventEarlyDate")
    let germSearchEventLateDateInput = $("#germSearchEventLateDate")
    let germSearchRecordedByInput = $("#germSearchRecordedBy")
    let germSearchRecordNumberInput = $("#germSearchRecordNumber")
    let germSearchStateProvinceInput = $("#germSearchStateProvince")
    let germSearchCountyInput = $("#germSearchCounty")
    let germSearchLocalityInput = $("#germSearchLocality")
    let germSearchLocationRemarksInput = $("#germSearchLocationRemarks")
    let germSearchLocationIDInput = $("#germSearchLocationID")
    let searchGermTrialsForm = $("#searchGermTrialsForm")
    $(searchGermTrialsForm).on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let newSearchGermTrialsSearchEntries = {
            project: germSearchProjectInput.val(),
            scientificName: germSearchScientificNameInput.val(),
            materialSample_catalogNumber: germSearchCatalogNumberInput.val(),
            stratStartEarlyDate: germSearchStratificationEarlyDateInput.val(),
            stratStartLateDate: germSearchStratificationLateDateInput.val(),
            endEarlyDate: germSearchEndEarlyDateInput.val(),
            endLateDate: germSearchEndLateDateInput.val(),
            eventEarlyDate: germSearchEventEarlyDateInput.val(),
            eventLateDate: germSearchEventLateDateInput.val(),
            recordedBy: germSearchRecordedByInput.val(),
            recordNumber: germSearchRecordNumberInput.val(),
            stateProvince: germSearchStateProvinceInput.val(),
            county: germSearchCountyInput.val(),
            locality: germSearchLocalityInput.val(),
            locationRemarks: germSearchLocationRemarksInput.val(),
            locationID: germSearchLocationIDInput.val()
        }
        searchGermTrialsFormEntries = newSearchGermTrialsSearchEntries
        submitGermTrialSearch()
    })
    //send to backend via api
    const submitGermTrialSearch = () => {
        $.ajax({
            method: "POST",
            url: "/api/getGerminationTrialResults",
            data: searchGermTrialsFormEntries
        })
        .then((germinationTrialResults) => {
            germinationTrialResultList = []
            $.each(germinationTrialResults, function(i, trialInResult) {
                germinationTrialResultList.push(
                    `<tr>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" data-addViabilityTrackingButton="true" data-id=${trialInResult.id} data-catalognumber=${trialInResult.materialSample_catalogNumber}>Add Viability Tracking</button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary" data-finishTrialButton="true" data-id=${trialInResult.id} data-catalognumber=${trialInResult.materialSample_catalogNumber}>Finish Trial</button>
                    </td>
                    <td>${trialInResult.scientificName}</td>
                    <td>${trialInResult.materialSample_catalogNumber}</td>
                    <td>${trialInResult.stratificationStartDate}</td>
                    <td>${trialInResult.incubationStartDate}</td>
                    <td>${trialInResult.endDate}</td>
                    <td>${trialInResult.numberSeedsTested}</td>
                    <td>${trialInResult.numberDead}</td>
                    <td>${trialInResult.numberViable}</td>
                    <td>${trialInResult.totalGerminants}</td>
                    <td>${trialInResult.viabilityAdjustedGermination}</td>
                    <td>${trialInResult.stratificationTemperature}</td>
                    <td>${trialInResult.incubationTempDay}</td>
                    <td>${trialInResult.incubationTempNight}</td>
                    <td>${trialInResult.testConductedBy}</td>
                    <td>${trialInResult.eventDate}</td>
                    <td>${trialInResult.locationID}</td>
                    `
                )
            })
        })
        .then(function(){
            $('#germinationTrialResultTableData').empty()
            $('#germinationTrialResultTableData').append(germinationTrialResultList.join(''))
            $('#searchGermTrialResults').show()
        })
        .catch((error) => {
            console.error(error);
        })
    }

//--------------------------------------------------------------------------------------------------
//DOWNLOAD GERMINATION TRIAL SEARCH RESULTS TO CSV
//--------------------------------------------------------------------------------------------------
    //create the csv of germination trial results on the back end
    const exportGermTrialResults = (req,res) => {
        $.ajax({
            url: "/api/exportGerminationTrialResults",
            method: "POST",
        })
        .then((res) => {
            //console.log(res)
            germinationTrialResultsCSVFileName = res
        })
        .then(function(){
            downloadFileFromBackend()
        })
        .catch((error) => {
            console.error(error);
        })
    }

    function downloadFileFromBackend() {
        $.ajax({
            url: "/api/downloadGerminationTrialsFile/"+germinationTrialResultsCSVFileName,
            method: "GET"
        })
        .then(function() {
            downloadBlobFromURL('http://localhost:8080/api/downloadGerminationTrialsFile/'+germinationTrialResultsCSVFileName, germinationTrialResultsCSVFileName);
        })
        function downloadBlobFromURL(url, fileName) {
            fetch(url)
              .then(response => response.blob())
              .then(blob => {
                // Create a URL for the Blob
                const blobURL = URL.createObjectURL(blob);
          
                // Create an anchor element
                const downloadLink = document.createElement('a');
                downloadLink.href = blobURL;
                downloadLink.download = fileName; // Set the desired filename
          
                // Append the anchor element to the document body
                document.body.appendChild(downloadLink);
          
                // Simulate a click event on the anchor element
                downloadLink.click();
          
                // Clean up the created URL and remove the anchor element
                URL.revokeObjectURL(blobURL);
                document.body.removeChild(downloadLink);
              })
              .catch(error => {
                console.error('Error downloading blob:', error);
              });
          }
    }

//--------------------------------------------------------------------------------------------------
//ADD VIABILITY TRACKING TO GERMINATION TRIAL RECORD
//--------------------------------------------------------------------------------------------------
    //Event listener for button to capture ID of selected germination trial
    $(document).on('click','button[data-addViabilityTrackingButton="true"]',function(event){
        //event.preventDefault()
        germinationTrialIDSelectedAddViability = $(this).data('id')
        getOneGermTrialQuery = {
            id: germinationTrialIDSelectedAddViability
        }
        $("#searchGermTrialsFormPage").hide()
        $("#searchGermTrialResults").hide()
        $("#createNewGerminationTrialHref").hide()
        $("#addViabilityTrackingFormAndMetadata").show()
        getGermTrialMetadataForAddTracking()
    })
    
    //function to get germiantion trial metadata and display on add viability tracking page
    getGermTrialMetadataForAddTracking = () => {
        $.ajax({
            method: "POST",
            url: "/api/getGermplasmViabilityTestByID",
            data: getOneGermTrialQuery
        })
        .then((trialFromDB) => {
            germinationTrialIDForAddingViabilityTracking = trialFromDB[0].id
            let seedScarified
            let frozen
            if (trialFromDB[0].scarified === 1){
                seedScarified = "Yes"
            } else {
                seedScarified = "No"
            }
            if (trialFromDB[0].sampleFrozen === 1){
                frozen = "Yes"
            } else {
                frozen = "No"
            }
            $("#addViabilityTrackingMetadata1").append(`${trialFromDB[0].scientificName} seed (${trialFromDB[0].materialSample_catalogNumber}) collected from ${trialFromDB[0].locationID} in ${trialFromDB[0].county} County on ${trialFromDB[0].eventDate} by ${trialFromDB[0].recordedBy}.`)
            $("#addViabilityTrackingMetadata2").append(`Pretreatments: | Seed Scarified: ${seedScarified} | Sample Frozen: ${frozen} | Stratification Start Date: ${trialFromDB[0].stratificationStartDate} | Stratification Temperature: ${trialFromDB[0].stratificationTemperature} |  Incubation Start Date ${trialFromDB[0].incubationStartDate} | Incubation Temp Day: ${trialFromDB[0].incubationTempDay} | Incubation Temp Night: ${trialFromDB[0].incubationTempNight} | Trial Started With ${trialFromDB[0].numberSeedsTested} Seeds.`)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
    //retrieve user entries and add to addViabilityTrackingFormEntries object
    let numberGerminantsInput = $("#numberGerminants")
    let viabilityTrackingDateInput = $("#viabilityTrackingDate")
    let viabilityTrackingNotesInput = $("#viabilityTrackingNotes")
    let addViabilityTrackingForm = $("#addViabilityTrackingForm")
    $(addViabilityTrackingForm).on("submit", function handleFormSubmit(event){
        event.preventDefault()
        if (!numberGerminantsInput.val().trim() || !viabilityTrackingDateInput.val().trim()){
            alert("Please provide a value for number germinants and the date")
        }
        newAddViabilityTrackingFormEntries = {
            numberGerminants: numberGerminantsInput.val().trim(),
            date: viabilityTrackingDateInput.val().trim(),
            notes: viabilityTrackingNotesInput.val().trim(),
            germplasmViabilityTestID: germinationTrialIDForAddingViabilityTracking
        }
        submitViabilityTracking()
    })
    
    //function to send Add Viability Tracking Form Inputs to backend via api
    const submitViabilityTracking = () => {
        $.ajax({
            method: "POST",
            url: "/api/addViabilityTracking",
            data: newAddViabilityTrackingFormEntries,
            success: function(){
                alert('Success! You have submitted this viability tracking record to the database. Keep up the great work!')
            }
        })
        .then(function(){
            window.location.href = '/germinationTrials'
        })
        .catch((error) => {
            console.error(error);
        })
    }

//--------------------------------------------------------------------------------------------------
//FINSIH GERMINATION TRIAL
//--------------------------------------------------------------------------------------------------
    //Event listener for button to capture ID of selected germination trial
    $(document).on('click','button[data-finishTrialButton="true"]',function(event){
        //event.preventDefault()
        germinationTrialIDSelectedFinish = $(this).data('id')
        getOneGermTrialQuery = {
            id: germinationTrialIDSelectedFinish
        }
        $("#searchGermTrialsFormPage").hide()
        $("#searchGermTrialResults").hide()
        $("#createNewGerminationTrialHref").hide()
        $("#finishGerminationTrialFormAndMetadata").show()
        getGermTrialMetadataForFinish()
    })
    
    //function to get germiantion trial metadata and display on add viability tracking page
    getGermTrialMetadataForFinish = () => {
        $.ajax({
            method: "POST",
            url: "/api/getGermplasmViabilityTestByID",
            data: getOneGermTrialQuery
        })
        .then((trialFromDB) => {
            germinationTrialIDForFinishingTrial = trialFromDB[0].id
            let seedScarified
            let frozen
            if (trialFromDB[0].scarified === 1){
                seedScarified = "Yes"
            } else {
                seedScarified = "No"
            }
            if (trialFromDB[0].sampleFrozen === 1){
                frozen = "Yes"
            } else {
                frozen = "No"
            }
            $("#finishGerminationTrialMetadata1").append(`${trialFromDB[0].scientificName} seed (${trialFromDB[0].materialSample_catalogNumber}) collected from ${trialFromDB[0].locationID} in ${trialFromDB[0].county} County on ${trialFromDB[0].eventDate} by ${trialFromDB[0].recordedBy}.`)
            $("#finishGerminationTrialMetadata2").append(`Pretreatments: | Seed Scarified: ${seedScarified} | Sample Frozen: ${frozen} | Stratification Start Date: ${trialFromDB[0].stratificationStartDate} | Stratification Temperature: ${trialFromDB[0].stratificationTemperature} |  Incubation Start Date ${trialFromDB[0].incubationStartDate} | Incubation Temp Day: ${trialFromDB[0].incubationTempDay} | Incubation Temp Night: ${trialFromDB[0].incubationTempNight} | Trial Started With ${trialFromDB[0].numberSeedsTested} Seeds.`)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
    //retrieve user entries and add to addViabilityTrackingFormEntries object
    let endDateInput = $("#finishTrialEndDate")
    let numberDeadInput = $("#finishTrialNumberDead")
    let numberViableInput = $("#finishTrialNumberViable")
    let totalGerminantsInput = $("#finishTrialTotalGerminants")
    let finishGerminationTrialForm = $("#finishGerminationTrialForm")
    $(finishGerminationTrialForm).on("submit", function handleFormSubmit(event){
        event.preventDefault()
        if (!endDateInput.val().trim() || !numberDeadInput.val().trim() || !numberViableInput.val().trim() || !totalGerminantsInput.val().trim()){
            alert("Please provide a valid value for all fields!")
        }
        newFinishTrialFormEntries = {
            endDate: endDateInput.val().trim(),
            numberDead: numberDeadInput.val().trim(),
            numberViable: numberViableInput.val().trim(),
            totalGerminants: totalGerminantsInput.val().trim(),
            id: germinationTrialIDForFinishingTrial
        }
        submitFinishTrial()
    })
    
    //function to send Finish Germination Trial form inputs to backend via api
    const submitFinishTrial = () => {
        $.ajax({
            method: "PUT",
            url: "/api/finishGerminationTest",
            data: newFinishTrialFormEntries,
            success: function(){
                alert('Success! You have finished this germination trial. Keep up the great work!')
            }
        })
        .then(function(){
            window.location.href = '/germinationTrials'
        })
    }


//--------------------------------------------------------------------------------------------------
//SEARCH FOR SEED TO USE IN GERMINATION TRIAL
//--------------------------------------------------------------------------------------------------
    //add user entries to searchSeedForGermTrialFormEntries object
    //send to backend via api
    //return results
    //display results in list sorted by taxon
    let scientificNameSeedNewTrialInput = $("#scientificNameSeedNewTrial")
    let catalogNumberSeedNewTrialInput = $("#catalogNumberSeedNewTrial")
    let eventEarlyDateSeedNewTrialInput = $("#eventEarlyDateSeedNewTrial")
    let eventLateDateSeedNewTrialInput = $("#eventLateDateSeedNewTrial")
    let seedForTrialSearchForm = $("#seedForTrialSearchForm")
    $(seedForTrialSearchForm).on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let newTrialSeedSearchEntries = {
            materialSample_catalogNumber: catalogNumberSeedNewTrialInput.val(),
            scientificName: scientificNameSeedNewTrialInput.val(),
            earlyDate: eventEarlyDateSeedNewTrialInput.val(),
            lateDate: eventLateDateSeedNewTrialInput.val()
        }
        searchSeedForGermTrialFormEntries = newTrialSeedSearchEntries
        submitnewTrialSeedSearch()
    })
    
    const submitnewTrialSeedSearch = () => {
        $.ajax({
            method: "POST",
            url: "/api/seedForTrial",
            data: searchSeedForGermTrialFormEntries
        })
        .then((seedsForTrialResults) => {
            console.log(seedsForTrialResults)
            seedforTrialResultsList = []
            $.each(seedsForTrialResults, function(i, seedInResult) {
                seedforTrialResultsList.push(
                    `<tr>
                    <td>${seedInResult.scientificName}</td>
                    <td>${seedInResult.materialSample_catalogNumber}</td>
                    <td>${seedInResult.eventDate}</td>
                    <td>${seedInResult.numberCollected}</td>
                    <td>${seedInResult.numberAvailable}</td>
                    <td>${seedInResult.dateStored}</td>
                    <td>${seedInResult.stateProvince}</td>
                    <td>${seedInResult.county}</td>
                    <td>${seedInResult.locality}</td>
                    <td>${seedInResult.locationID}</td>
                    <td>
                        <button class="seedSampleSelected btn btn-sm btn-outline-primary" data-id=${seedInResult.id} data-catalognumber=${seedInResult.materialSample_catalogNumber}>Create New Germination Trial</button>
                    </td>`
                )
            })
        })
        .then(function(){
            $('#seedResultTableData').empty()
            $('#seedResultTableData').append(seedforTrialResultsList.join(''))
            $('#seedSearchGermTrialResults').show()
        })
        .catch((error) => {
            console.error(error);
        })
    }    
//--------------------------------------------------------------------------------------------------
//CREATE NEW GERMINATION TRIAL
//--------------------------------------------------------------------------------------------------
    //event listener for button to capture ID of selected seed for new germination trial
    $("#seedResultTableData").on('click','.seedSampleSelected', function(){
        seedSampleSelectedID = $(this).data('id')
        seedSampleSelectedCatalogNumber = $(this).data('catalognumber')
        $('#newGermTrialDataForm').show()
        $('#seedSelectedTitle').text(`New Germination Trial for ${seedSampleSelectedCatalogNumber}`)
    })
    //add user entries to newGermTrialFormEntries object
    let testConductedByInput = $("#testConductedBy")
    let sampleFrozenAnswer
    //let sampleFrozenYesInput = $("#sampleFrozenYes")
    //let sampleFrozenNoInput = $("#sampleFrozenNo")
    let mediumInput = $("#medium")
    //let scarifiedYesInput = $("#scarifiedYes")
    //let scarifiedNoInput = $("#scarifiedNo")
    let scarifiedAnswer
    let stratificationTemperatureInput = $("#stratificationTemperature")
    let stratificationStartDateInput = $("#stratificationStartDate")
    let incubationStartDateInput = $("#incubationStartDate")
    let numberSeedsTestedInput = $("#numberSeedsTested")
    let incubationTemperatureDayInput = $("#incubationTemperatureDay")
    let incubationTemperatureNightInput = $("#incubationTemperatureNight")
    let newGermTrialDataForm = $("#newGermTrialDataForm")
    $(newGermTrialDataForm).on("submit", function handleFormSubmit(event){
        console.log("Submitting germination trial data")
        event.preventDefault()
        if (document.getElementById('sampleFrozenYes').checked) {
            sampleFrozenAnswer = 1
        }
        if (document.getElementById('sampleFrozenNo').checked) {
            sampleFrozenAnswer = 0
        }
        if (document.getElementById('scarifiedYes').checked) {
            scarifiedAnswer = 1
        }
        if (document.getElementById('scarifiedNo').checked) {
            scarifiedAnswer = 0
        }
        let newGermTrialEntries = {
            materialSample_catalogNumber: seedSampleSelectedCatalogNumber,
            testConductedBy: testConductedByInput.val().trim(),
            sampleFrozen: sampleFrozenAnswer,
            medium: mediumInput.val().trim(),
            scarified: scarifiedAnswer,
            stratificationTemperature: stratificationTemperatureInput.val().trim(),
            stratificationStartDate: stratificationStartDateInput.val().trim(),
            incubationStartDate: incubationStartDateInput.val().trim(),
            numberSeedsTested: numberSeedsTestedInput.val().trim(),
            incubationTempDay: incubationTemperatureDayInput.val().trim(),
            incubationTempNight: incubationTemperatureNightInput.val().trim(),
            materialSampleTableID: seedSampleSelectedID
        }
        newGermTrialFormEntries = newGermTrialEntries
        submitNewGerminationTrial()
    })
//send to backend via api
const submitNewGerminationTrial = () => {
        $.ajax({
            method: "POST",
            url: "/api/addGerminationTest",
            data: newGermTrialFormEntries,
            success: function(){
                alert('Success! Your new germination trial was submitted to the database. Hope they sprout!')
            }
    })
    .then(function(){
        window.location.href = '/germinationTrials'
    })
    .catch((error) => {
        console.error(error);
    })
}

//--------------------------------------------------------------------------------------------------
//SEARCH FOR SAMPLES TO TRANSFER
//--------------------------------------------------------------------------------------------------
    //add user entries to searchSamplesToTransferFormEntries object
    //send to backend via api
    //return results
    //display results in list


    

//Create a New Transfer
    //Event listener for button to capture ID of selected sample
    //add user entries to newTransferFormEntries object
    //send to backend via api

//Search for Transfers
    //add user entries to searchTransfersFormEntries object
    //send to backend via api
    //return results
    //display results in list

//Update Tranfser
    //Event listener for button to capture ID of selected transfer
    //add user entries to updateTransferFormEntries object
    //send to backend via api



//Search for Material Samples to Update
    //add user entries to searchSamplesToTransferFormEntries object
    //send to backend via api
    //return results
    //display results in list

//Update Material Sample
    //Event listener for button to capture ID of selected material sample
    //add user entries to updatTransferFormEntries object
    //send to backend via api

//--------------------------------------------------------------------------------------------------
// EVENT LISTENERS
//--------------------------------------------------------------------------------------------------

    //Functions to Execute on Page Load by Page
    let currentURL = window.location.pathname

    let creatProjectPage = "/createNewProject"
    let uploadData = "/uploadMaterialSamples"
    let addViabilityTracking = "/addViabilityTracking"

    if (currentURL === creatProjectPage){
        fetchProjects()
    } else if (currentURL === uploadData){
        listProjectsForUpload()
    }

})