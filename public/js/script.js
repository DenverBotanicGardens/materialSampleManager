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
    let germinationTrialsSearchResults = []

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

    //Finish Germination Trial Form
    //an object to contain the values entered by the user in the finish germination trial form on the finish germiantion trial page.
    let finsihGermTrialFormEntries = {}

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

//--------------------------------------------------------------------------------------------------
// EVENT LISTENERS
//--------------------------------------------------------------------------------------------------
//Hide Elements
    //Search Page
    $('#searchResults').hide()

    //Germination Trials Page
    $('#searchGermTrialResults').hide()
    
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


//Submit New Project
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

//Get Existing Projects to Display on Projects Page
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
    }


//Get Existing Projects to Display in Dropdown List on Upload Data Page
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
    }

//Capture id For Selected Project
    // send to backend csvUplaod controller to be incorporated into data being uploaded

//Send csv to backend for upload to database

//Search Germination Trials
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
                        <button class="btn btn-sm btn-outline-primary" data-id=${trialInResult.id} data-catalognumber=${trialInResult.materialSample_catalogNumber}>Add Viability Tracking</button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary" data-id=${trialInResult.id} data-catalognumber=${trialInResult.materialSample_catalogNumber}>Finish Trial</button>
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
    }
    //return results
    //display results in list sorted by taxon and then date

    
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

//Add Viability Tracking to Germination Trial Record
    //Event listener for button to capture ID of selected germination trial
    //retrieve user entries and add to addViabilityTrackingFormEntries object
    //send to backend via api


//Finish GerminatioN Trial
    //Event listener for button to capture ID of selected germination trial
    //retrieve user entries and add to finsihGermTrialFormEntries object
    //send to backend via api


//Search for Seed for Germination Trial
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
    }    

//Create New Germination Trial
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
}

//Search for Transfers
    //add user entries to searchTransfersFormEntries object
    //send to backend via api
    //return results
    //display results in list

//Update Tranfser
    //Event listener for button to capture ID of selected transfer
    //add user entries to updateTransferFormEntries object
    //send to backend via api

//Search for Samples to Transfer
    //add user entries to searchSamplesToTransferFormEntries object
    //send to backend via api
    //return results
    //display results in list

//Create a New Transfer
    //Event listener for button to capture ID of selected sample
    //add user entries to newTransferFormEntries object
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

    if (currentURL === creatProjectPage){
        fetchProjects()
    } else if (currentURL === uploadData){
        listProjectsForUpload()
    }

})