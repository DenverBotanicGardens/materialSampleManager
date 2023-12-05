$(document).ready(function() {
    //--------------------------------------------------------------------------------------------------
    //GLOBAL VARIABLES
    //--------------------------------------------------------------------------------------------------
    //login entries
    let loginEntries = {}
    
    //Search Form
    //an object to contain the values entered by the user into the form on the Search page
    let searchFormEntires = {}

    //an array to contain the results from a search
    let searchResultsList = []

    //Filename for CSV containing Search Results Data that is to be downloaded by the client
    let searchResultsCSVFileName

    //Search Collections Form
    //an object to contain the values entered by the user into the form on the Search page
    let searchCollectionsFormEntires = {}

    //an array to contain the results from a search collections search
    let searchCollectionsResultsList = []

    //Filename for CSV containing Collections Search Results Data that is to be downloaded by the client
    let searchCollectionsResultsCSVFileName
    
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
    let transferSearchResultsList = []
    
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
    let updateTransferFormEntries = {}
    
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

    //Seed Samples Due for Viability Testing
    let seedsDueForTrialResult

    //Filename for CSV containing Trials Due Results Data that is to be downloaded by the client
    let trialsDueResultsCSVFileName


    //--------------------------------------------------------------------------------------------------
    // EVENT LISTENERS (more at bottom of script)
    //--------------------------------------------------------------------------------------------------
    //Hide Elements
    //Search Page
    $('#searchResults').hide()

    //Search Collections Page
    $('#searchCollectionsResults').hide()
    
    //Germination Trials Page
    $('#searchGermTrialResults').hide()
    $("#addViabilityTrackingFormAndMetadata").hide()
    $("#finishGerminationTrialFormAndMetadata").hide()
    
    //Create New Germination Trial Page
    $('#seedSearchGermTrialResults').hide()
    $('#newGermTrialDataForm').hide()
    
    //Transfers Page
    $('#searchTransfersResults').hide()
    $('#sampleTransferUpdatesForm').hide()

    //New Transfer Page
    $('#searchMaterialSampleToTransferResults').hide()
    $('#newTransferDataForm').hide()

    //Update Material Sample Page
    $('#searchSamplesToUpdateResults').hide()
    $('#sampleUpdatesForm').hide()

    //Seed Samples Due for Viability Testing Page
    $('#trialsDueResults').hide()

//Buttons to Execute Functions
    //Execute Search

    //Download Search Results to CSV
    $("#downloadSearchResults").on("click", function(){
        exportSearchResults()
    })

    //Download Germinations Trials to CSV
    $("#downloadGerminationTrialRecordsResults").on("click", function(){
        exportGermTrialResults()
    })

    //Log Out
    $("#logoutButton").on("click", function(){
        logoutUser()
    })

    //Download Template CSV
    $("#downloadTemplate").on("click", function(){
        downloadTemplate()
    })

    //Hide all download buttons until a query has been perform
    $("#downloadSearchResults").hide()
    $("#downloadGerminationTrialRecordsResults").hide()
    $("#downloadCollectionsSearchResults").hide()
    $("#downloadTrialsDueFile").hide()
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Search Material Samples
//--------------------------------------------------------------------------------------------------

    //add user entries to searchFormEntires object
    let searchProject = $("#searchProject")
    let searchScientificName = $("#searchScientificName")
    let searchMaterialSampleType = $("#searchMaterialSampleType")
    let searchMaterialSampleCatalogNumber = $("#searchMaterialSampleCatalogNumber")
    let searchSpecimenCatalogNumber = $("#searchSpecimenCatalogNumber")
    let searchEventEarlyDate = $("#searchEventEarlyDate")
    let searchEventLateDate = $("#searchEventLateDate")
    let searchRecordedBy = $("#searchRecordedBy")
    let searchRecordNumber = $("#searchRecordNumber")
    let searchStateProvince = $("#searchStateProvince")
    let searchCounty = $("#searchCounty")
    let searchLocality = $("#searchLocality")
    let selectedLocalityOption
    let searchLocationRemarks = $("#searchLocationRemarks")
    let searchLocationID = $("#searchLocationID")
    $('input[name="localityRadio"]').click(function() {
        selectedLocalityOption = $('input[name="localityRadio"]:checked').val();
    })
    $("#searchSamplesForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let optradio
        if (selectedLocalityOption == "contains"){
            optradio = "contains"
        } else if (selectedLocalityOption == "startsWith"){
            optradio = "startsWith"
        } else if (selectedLocalityOption == "isExactly"){
            optradio = "isExactly"
        } else if (selectedLocalityOption === undefined){
            optradio = ""
        } else {
            alert("Please the locality components of your query")
        }
        let newSearchSamplesEntries = {
            project: searchProject.val(),
            scientificName: searchScientificName.val(),
            materialSampleType: searchMaterialSampleType.val(),
            materialSample_catalogNumber: searchMaterialSampleCatalogNumber.val(),
            catalogNumber: searchSpecimenCatalogNumber.val(),
            eventEarlyDate: searchEventEarlyDate.val(),
            eventLateDate: searchEventLateDate.val(),
            recordedBy: searchRecordedBy.val(),
            materialSample_recordNumber: searchRecordNumber.val(),
            stateProvince: searchStateProvince.val(),
            county: searchCounty.val(),
            locality: searchLocality.val(),
            optradio: optradio,
            locationRemarks: searchLocationRemarks.val(),
            locationID: searchLocationID.val()
        }
        searchFormEntires = newSearchSamplesEntries
        console.log(searchFormEntires)
        submitSampleSearch()
    })
    //send to backend via api
    const submitSampleSearch = () => {
        $.ajax({
            method: "POST",
            url: "/api/searchMaterialSamples",
            data: searchFormEntires
        })
        //return results
        .then((searchSampleResults) => {
            searchResultsList = []
            //display results in list
            $.each(searchSampleResults, function(i, resultFromSearch) {
                searchResultsList.push(
                    `<tr>
                    <td>${resultFromSearch.scientificName}</td>
                    <td>${resultFromSearch.materialSample_catalogNumber}</td>
                    <td>${resultFromSearch.materialSampleType}</td>
                    <td>${resultFromSearch.eventDate}</td>
                    <td>${resultFromSearch.recordedBy}</td>
                    <td>${resultFromSearch.numberCollected}</td>
                    <td>${resultFromSearch.numberAvailable}</td>
                    <td>${resultFromSearch.stateProvince}</td>
                    <td>${resultFromSearch.county}</td>
                    <td>${resultFromSearch.locality}</td>
                    <td>${resultFromSearch.locationID}</td>
                    <td>${resultFromSearch.locationRemarks}</td>
                    </tr>`
                )
            })
        })
        .then(function(){
            $('#searchResultTableData').empty()
            $('#searchResultTableData').append(searchResultsList.join(''))
            $('#searchResults').show()
            $("#downloadSearchResults").show()
        })
        .catch((error) => {
            console.error(error);
        })
    }


//--------------------------------------------------------------------------------------------------
//Download Material Sample Records To CSV
//--------------------------------------------------------------------------------------------------
    //create the csv of materialSample results on the back end
    const exportSearchResults = (req,res) => {
        $.ajax({
            url: "/api/exportSearchToCSV",
            method: "POST",
        })
        .then((res) => {
            searchResultsCSVFileName = res
        })
        .then(function(){
            downloadSearchResultsFileFromBackend()
        })
        .catch((error) => {
            console.error(error);
        })
    }

    function downloadSearchResultsFileFromBackend() {
        $.ajax({
            url: "/api/downloadSearchResultsFile/"+searchResultsCSVFileName,
            method: "GET"
        })
        .then(function() {
            downloadBlobFromURLSearch('http://localhost:8080/api/downloadSearchResultsFile/'+searchResultsCSVFileName, searchResultsCSVFileName);
        })
        function downloadBlobFromURLSearch(url, fileName) {
            fetch(url)
              .then(response => response.blob())
              .then(blob => {
                // Create a URL for the Blob
                const blobURL = URL.createObjectURL(blob);
          
                // Create an anchor element
                const downloadLinkSearch = document.createElement('a');
                downloadLinkSearch.href = blobURL;
                downloadLinkSearch.download = fileName; // Set the desired filename
          
                // Append the anchor element to the document body
                document.body.appendChild(downloadLinkSearch);
          
                // Simulate a click event on the anchor element
                downloadLinkSearch.click();
          
                // Clean up the created URL and remove the anchor element
                URL.revokeObjectURL(blobURL);
                document.body.removeChild(downloadLinkSearch);
              })
              .catch(error => {
                console.error('Error downloading blob:', error);
              });
          }
    }

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
            console.log(germinationTrialResultList)
            $('#germinationTrialResultTableData').empty()
            $('#germinationTrialResultTableData').append(germinationTrialResultList.join(''))
            $('#searchGermTrialResults').show()
            $("#downloadGerminationTrialRecordsResults").show()
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
            console.log(res)
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
        $("#listTrialsDueHref").hide()        
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
        $("#listTrialsDueHref").hide()        
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
        .catch((error) => {
            console.log(error)
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
    let pretreatments = $("#pretreatments")
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
            pretreatments: pretreatments.val().trim(),
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
    let projectSearchSampleForTransfer = $("#projectSearchSampleForTransfer")
    let scientificNameSearchSampleForTransfer = $("#scientificNameSearchSampleForTransfer")
    let sampleTypeSearchSampleForTransfer = $("#sampleTypeSearchSampleForTransfer")
    let catalogNumberSearchSampleForTransfer = $("#catalogNumberSearchSampleForTransfer")
    let earlyDateSearchSampleForTransfer = $("#earlyDateSearchSampleForTransfer")
    let lateDateSearchSampleForTransfer = $("#lateDateSearchSampleForTransfer")
    let recordedBySearchSampleForTransfer = $("#recordedBySearchSampleForTransfer")
    let recordNumberSearchSampleForTransfer = $("#recordNumberSearchSampleForTransfer")
    let stateProvinceSearchSampleForTransfer = $("#stateProvinceSearchSampleForTransfer")
    let countySearchSampleForTransfer = $("#countySearchSampleForTransfer")
    $("#searchForSampleToTransfer").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let newTransferSampleSearchEntries = {
            project: projectSearchSampleForTransfer.val(),
            scientificName: scientificNameSearchSampleForTransfer.val(),
            materialSampleType: sampleTypeSearchSampleForTransfer.val(),
            materialSample_catalogNumber: catalogNumberSearchSampleForTransfer.val(),
            eventEarlyDate: earlyDateSearchSampleForTransfer.val(),
            eventLateDate: lateDateSearchSampleForTransfer.val(),
            recordedBy: recordedBySearchSampleForTransfer.val(),
            materialSample_recordNumber: recordNumberSearchSampleForTransfer.val(),
            stateProvince: stateProvinceSearchSampleForTransfer.val(),
            county: countySearchSampleForTransfer.val()
        }
        searchSamplesToTransferFormEntries = newTransferSampleSearchEntries
        //console.log(searchSamplesToTransferFormEntries)
        submitnewTransferSampleSearch()
    })
    //send to backend via api
    const submitnewTransferSampleSearch = () => {
        $.ajax({
            method: "POST",
            url: "/api/searchMaterialSamplesForTransfer",
            data: searchSamplesToTransferFormEntries
        })
        //return results
        .then((samplesForTransferResults) => {
            //console.log(samplesForTransferResults)
            samplesForTransferResultsList = []
            //display results in list
            $.each(samplesForTransferResults, function(i, sampleInResult) {
                samplesForTransferResultsList.push(
                    `<tr>
                    <td>${sampleInResult.scientificName}</td>
                    <td>${sampleInResult.materialSample_catalogNumber}</td>
                    <td>${sampleInResult.eventDate}</td>
                    <td>${sampleInResult.numberCollected}</td>
                    <td>${sampleInResult.numberAvailable}</td>
                    <td>${sampleInResult.dateStored}</td>
                    <td>${sampleInResult.stateProvince}</td>
                    <td>${sampleInResult.county}</td>
                    <td>${sampleInResult.locality}</td>
                    <td>${sampleInResult.locationID}</td>
                    <td>
                        <button class="sampleSelectedForTransfer btn btn-sm btn-outline-primary" data-id=${sampleInResult.materialSampleTableID} data-catalognumber=${sampleInResult.materialSample_catalogNumber}>Transfer Sample</button>
                    </td>`
                )
            })
        })
        .then(function(){
            $('#materialSamplesForTransferData').empty()
            $('#materialSamplesForTransferData').append(samplesForTransferResultsList.join(''))
            $('#searchMaterialSampleToTransferResults').show()
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
//--------------------------------------------------------------------------------------------------
//Create a New Transfer
//--------------------------------------------------------------------------------------------------
    //Event listener for button to capture ID of selected sample
    $("#materialSamplesForTransferData").on('click','.sampleSelectedForTransfer', function(){
        sampleSelectedForTransferID = $(this).data('id')
        sampleSelectedForTransferCatalogNumber = $(this).data('catalognumber')
        $('#newTransferDataForm').show()
        $('#sampleSelectedForTransferTitle').text(`Sample to be transferred: ${sampleSelectedForTransferCatalogNumber}`)
        $(document).scrollTop($(document).height()); 
    })
    //add user entries to newTransferFormEntries object
    let newTransferNumbersamples = $("#newTransferNumbersamples")
    let newTransferDate = $("#newTransferDate")
    let newTransferReceivedDate = $("#newTransferReceivedDate")
    let newTransferAgencyTransferredTo = $("#newTransferAgencyTransferredTo")
    let newTransferPersonTransferredTo = $("#newTransferPersonTransferredTo")
    let newTransferPurposeNotes = $("#newTransferPurposeNotes")
    $("#newTransferDataForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        console.log("button pushed")
        let newTransferDataFormEntries = {
            materialSampleTableID: sampleSelectedForTransferID,
            materialSample_catalogNumber: sampleSelectedForTransferCatalogNumber,
            numberSamplesTransferred: newTransferNumbersamples.val(),
            transferDate: newTransferDate.val(),
            receivedDate: newTransferReceivedDate.val(),
            agencyTransferredTo: newTransferAgencyTransferredTo.val(),
            personTransferredTo: newTransferPersonTransferredTo.val(),
            purposeNotes: newTransferPurposeNotes.val()
        }
        newTransferFormEntries = newTransferDataFormEntries
        console.log(newTransferFormEntries)
        submitNewTransfer()
    })
    //send to backend via api
    const submitNewTransfer = () => {
        $.ajax({
            method: "POST",
            url: "/api/addTransfer",
            data: newTransferFormEntries,
            success: function(){
                alert('Success! You have submitted a new transfer to the database. Have a fun journey, little sample! \n \n You may select a different sample from this page and modify the Transfer Information Form if more samples are being transferred.')
            }
        })
            .then(function(){
                console.log("new transfer submitted")
            })
            .catch((error) => {
                console.error(error);
            })
    }

//--------------------------------------------------------------------------------------------------
//Search for Transfers
//--------------------------------------------------------------------------------------------------
    //add user entries to searchTransfersFormEntries object
    let searchTransfersScientificName = $("#searchTransfersScientificName")
    let searchTransfersMaterialSampleType = $("#searchTransfersMaterialSampleType")
    let searchTransfersCatalogNumber = $("#searchTransfersCatalogNumber")
    let searchTransfersTransferEarlyDate = $("#searchTransfersTransferEarlyDate")
    let searchTransfersTransferLateDate = $("#searchTransfersTransferLateDate")
    let searchTransfersAgencyTransferredTo = $("#searchTransfersAgencyTransferredTo")
    let searchTransfersPersonTransferredTo = $("#searchTransfersPersonTransferredTo")
    $("#searchTransfersForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let searchTransfersFormUserEntries = {
            scientificName: searchTransfersScientificName.val(),
            materialSampleType: searchTransfersMaterialSampleType.val(),
            materialSample_catalogNumber: searchTransfersCatalogNumber.val(),
            earlyDate: searchTransfersTransferEarlyDate.val(),
            lateDate: searchTransfersTransferLateDate.val(),
            agencyTransferredTo: searchTransfersAgencyTransferredTo.val(),
            personTransferredTo: searchTransfersPersonTransferredTo.val()
        }
        searchTransfersFormEntries = searchTransfersFormUserEntries
        console.log(searchTransfersFormEntries)
        submitTransferSearch()
    })
    //send to backend via api
    const submitTransferSearch = () => {
        $.ajax({
            method: "POST",
            url: "/api/getTransfer",
            data: searchTransfersFormEntries
        })
        //return results and add to data table
        .then((transferSearchResults) => {
            console.log(transferSearchResults)
            transferSearchResultsList = []
            $.each(transferSearchResults, function(i, transferInResult) {
                transferSearchResultsList.push(
                    `<tr>
                    <td>${transferInResult.scientificName}</td>
                    <td>${transferInResult.materialSample_catalogNumber}</td>
                    <td>${transferInResult.agencyTransferredTo}</td>
                    <td>${transferInResult.personTransferredTo}</td>
                    <td>${transferInResult.numberSamplesTransferred}</td>
                    <td>${transferInResult.numberSamplesReturned}</td>
                    <td>${transferInResult.purposeNotes}</td>
                    <td>${transferInResult.transferDate}</td>
                    <td>${transferInResult.receivedDate}</td>
                    <td>${transferInResult.numberCollected}</td>
                    <td>${transferInResult.numberAvailable}</td>
                    <td>${transferInResult.eventDate}</td>
                    <td>${transferInResult.stateProvince}</td>
                    <td>${transferInResult.county}</td>
                    <td>${transferInResult.locality}</td>
                    <td>
                        <button class="transferSelected btn btn-sm btn-outline-primary" data-id=${transferInResult.id} data-numbersamplestransferred=${transferInResult.numberSamplesTransferred} data-catalognumber=${transferInResult.materialSample_catalogNumber.replace(" ","_")} data-transferredto=${transferInResult.agencyTransferredTo.replace(" ","_")} data-scientificname=${transferInResult.scientificName.replace(" ","_")} data-transferdate=${transferInResult.transferDate}>Update Transfer</button>
                    </td>`
                )
            })
        })
        //display results in list
        .then(function(){
            $('#searchTransfersResultsData').empty()
            $('#searchTransfersResultsData').append(transferSearchResultsList.join(''))
            $('#searchTransfersResults').show()
        })
        .catch((error) => {
            console.error(error);
        })
    }
//--------------------------------------------------------------------------------------------------
//Update Tranfser
//--------------------------------------------------------------------------------------------------
    //Event listener for button to capture ID of selected transfer to be updated
        $("#searchTransfersResultsData").on('click','.transferSelected', function(){
            transferSelectedForUpdateID = $(this).data('id')
            transferSelectedForUpdateCatalogNumber = $(this).data('catalognumber').replace("_"," ")
            transferSelectedForUpdateScientificName = $(this).data('scientificname').replace("_"," ")
            transferSelectedForUpdateTransferredTo = $(this).data('transferredto').replace("_"," ")
            transferSelectedForUpdateTransferDate = $(this).data('transferdate')
            transfersSelectedForUpdateNumberSamplesTransferred = $(this).data('numbersamplestransferred')
            $('#sampleTransferUpdatesForm').show()
            $('#transferSelectedForUpdateTitle').text(`Update Existing Transfer record for ${transferSelectedForUpdateScientificName} (${transferSelectedForUpdateCatalogNumber}). ${transfersSelectedForUpdateNumberSamplesTransferred} samples sent to ${transferSelectedForUpdateTransferredTo} on ${transferSelectedForUpdateTransferDate}.`)
            $(document).scrollTop($(document).height());
        })
    //add user entries to updateTransferFormEntries object
    let transferUpdateNumberSamplesTransferred = $("#transferUpdateNumberSamplesTransferred")
    let transferUpdateTransferDate = $("#transferUpdateTransferDate")
    let transferUpdateReceivedDate = $("#transferUpdateReceivedDate")
    let transferUpdateAgencyTransferredTo = $("#transferUpdateAgencyTransferredTo")
    let transferUpdatePersonTransferredTo = $("#transferUpdatePersonTransferredTo")
    let transferUpdatePurposeNotes = $("#transferUpdatePurposeNotes")
    let transferUpdateReturnedDate = $("#transferUpdateReturnedDate")
    let transferUpdateNumberSamplesReturned = $("#transferUpdateNumberSamplesReturned")
    $("#sampleTransferUpdatesForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let transferUpdateFormUserEntries = {
            id: transferSelectedForUpdateID,
            agencyTransferredTo: transferUpdateAgencyTransferredTo.val(),
            personTransferredTo: transferUpdatePersonTransferredTo.val(),
            numberSamplesTransferred: transferUpdateNumberSamplesTransferred.val(),
            transferDate: transferUpdateTransferDate.val(),
            receivedDate: transferUpdateReceivedDate.val(),
            purposeNotes: transferUpdatePurposeNotes.val(),
            returnedDate: transferUpdateReturnedDate.val(),
            numberSamplesReturned: transferUpdateNumberSamplesReturned.val()
        }
        updateTransferFormEntries = transferUpdateFormUserEntries
        console.log(updateTransferFormEntries)
        submitTransferUpdate()
    })
    //send to backend via api
    const submitTransferUpdate = () => {
        $.ajax({
            method: "PUT",
            url: "/api/updateTransfer",
            data: updateTransferFormEntries,
            success: function(){
                alert('Success! You have updated a transfer in the database. \n \n You may select a different transfer from this page and modify the Update Material Sample Transfer Form if more transfers need to be updated.')
            }
        })
        .then(function(){
            console.log("transfer update submitted")
        })
        .catch((error) => {
            console.error(error);
        })
    }

//--------------------------------------------------------------------------------------------------
//Search for Material Samples to Update
//--------------------------------------------------------------------------------------------------
    //add user entries to searchSamplesToTransferFormEntries object
    let sampleSearchForUpdateCatalogNumber = $("#sampleSearchForUpdateCatalogNumber")
    let sampleSearchForUpdateScientificName = $("#sampleSearchForUpdateScientificName")
    let sampleSearchForUpdateMaterialSampleType = $("#sampleSearchForUpdateMaterialSampleType")
    let sampleSearchForUpdateProject = $("#sampleSearchForUpdateProject")
    $("#sampleSearchForUpdateForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let sampleSearchForUpdateFormEntries = {
            materialSample_catalogNumber: sampleSearchForUpdateCatalogNumber.val().trim(),
            scientificName: sampleSearchForUpdateScientificName.val().trim(),
            materialSampleType: sampleSearchForUpdateMaterialSampleType.val().trim(),
            project: sampleSearchForUpdateProject.val().trim(),
        }
        searchSamplesToUpdateFormEntries = sampleSearchForUpdateFormEntries
        console.log(searchSamplesToUpdateFormEntries)
        submitSearchSamplesForUpdate()
    })
    //send to backend via api
    const submitSearchSamplesForUpdate = () => {
        $.ajax({
            method: "POST",
            url: "/api/searchMaterialSamplesForUpdate",
            data: searchSamplesToUpdateFormEntries
        })
        //return results
        .then((samplesToUpdateSearchResults) => {
            console.log(samplesToUpdateSearchResults)
            samplesToUpdateSearchResultsList = []
            $.each(samplesToUpdateSearchResults, function(i, sampleInResult) {
                samplesToUpdateSearchResultsList.push(
                    `<tr>
                    <td>${sampleInResult.scientificName}</td>
                    <td>${sampleInResult.materialSample_catalogNumber}</td>
                    <td>${sampleInResult.recordedBy}</td>
                    <td>${sampleInResult.materialSampleType}</td>
                    <td>${sampleInResult.numberCollected}</td>
                    <td>${sampleInResult.numberAvailable}</td>
                    <td>${sampleInResult.eventDate}</td>
                    <td>${sampleInResult.stateProvince}</td>
                    <td>${sampleInResult.county}</td>
                    <td>${sampleInResult.locality}</td>
                    <td>${sampleInResult.disposition}</td>
                    <td>${sampleInResult.storageLocation}</td>

                    <td>
                        <button class="sampledSelectedForUpdate btn btn-sm btn-outline-primary" data-id=${sampleInResult.materialSampleTableID} data-catalognumber=${sampleInResult.materialSample_catalogNumber.replace(" ","_")} data-scientificname=${sampleInResult.scientificName.replace(" ","_")}>Update Sample</button>
                    </td>`
                )
            })
        })
        //display results in list
        .then(function(){
            $('#searchTransfersResultsData').empty()
            $('#searchTransfersResultsData').append(samplesToUpdateSearchResultsList.join(''))
            $('#searchSamplesToUpdateResults').show()
        })
        .catch((error) => {
            console.error(error);
        })
    }
//--------------------------------------------------------------------------------------------------
//Update Material Sample
//--------------------------------------------------------------------------------------------------

    //Event listener for button to capture ID of selected material sample
    $("#searchSamplesToUpdateResults").on('click','.sampledSelectedForUpdate', function(){
        sampledSelectedForUpdateID = $(this).data('id')
        sampledSelectedForUpdateCatalogNumber = $(this).data('catalognumber').toString().replace("_"," ")
        sampledSelectedForUpdateScientificName = $(this).data('scientificname').toString().replace("_"," ")
        $('#sampleUpdatesForm').show()
        $('#sampleSelectedForUpdateTitle').text(`Update Existing Sample record for ${sampledSelectedForUpdateScientificName} (${sampledSelectedForUpdateCatalogNumber}).`)
        $(document).scrollTop($(document).height());
    })
    //add user entries to updateTransferFormEntries object
    let sampleForUpdateDisposition = $("#sampleForUpdateDisposition")
    let sampleForUpdateStorageLocation = $("#sampleForUpdateStorageLocation")
    let sampleForUpdateNumberAvailable = $("#sampleForUpdateNumberAvailable")
    $("#sampleUpdatesForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let sampleUpdatesFormEntries = {
            id: sampledSelectedForUpdateID,
            disposition: sampleForUpdateDisposition.val().trim(),
            storageLocation: sampleForUpdateStorageLocation.val().trim(),
            numberAvailable: sampleForUpdateNumberAvailable.val().trim(),
        }
        updateMaterialSampleFormEntries = sampleUpdatesFormEntries
        console.log(updateMaterialSampleFormEntries)
        submitSampleUpdates()
    })
    //send to backend via api
    const submitSampleUpdates = () => {
        $.ajax({
            method: "PUT",
            url: "/api/updateMaterialSample",
            data: updateMaterialSampleFormEntries,
            success: function(){
                alert('Success! You have updated a sample in the database. \n \n You may select a different sample from this page and modify the Update Material Sample Form if more samples need to be updated.')
            }
        })
        .then(function(){
            console.log("sample update submitted")
        })
        .catch((error) => {
            console.error(error);
        })
    }
//--------------------------------------------------------------------------------------------------
// USER AUTH
//--------------------------------------------------------------------------------------------------
    //LOGGING IN
    let username = $("#username")
    let password = $("#password")
    $("#loginForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        loginEntries = {
            username: username.val(),
            password: password.val()
        }
        sendCredentials()
    })

    //function to send user credentials to backend
    const sendCredentials = () => {
        $.ajax({
            method: "POST",
            url: "/api/signin",
            data: loginEntries
        })
        .then((res) => {
            $("#password").val('')
            console.log(res)
            if (res.message == "Login successful"){
               window.location.href = '/'
            }
        })
        .catch((error) => {
            console.error(error);
            console.log(error.status)
            if (error.status == 401){
                alert("Username and/or password not found or incorrect")
            }
            $("#password").val('')
        })
    }

    //LOGGING OUT
    const logoutUser = () => {
        $.ajax({
            method: "POST",
            url: "/logout"
        })
        .then(res => {
            if (res.message == "Logout successful"){
                console.log("user logged out")
                window.location.href = '/'
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
    } 
    
//--------------------------------------------------------------------------------------------------
// DOWNLOAD TEMPLATE CSV FILE TO CLIENT
//--------------------------------------------------------------------------------------------------
    //download the template file to the client
    function downloadTemplate() {
        $.ajax({
            url: "/api/downloadTemplate/materialSampleManager_uploadTemplate.csv",
            method: "GET"
        })
        .then(function() {
            downloadBlobFromURLSearch('http://localhost:8080/api/downloadTemplate/materialSampleManager_uploadTemplate.csv', "materialSampleManager_uploadTemplate.csv");
        })
        function downloadBlobFromURLSearch(url, fileName) {
            fetch(url)
              .then(response => response.blob())
              .then(blob => {
                // Create a URL for the Blob
                const blobURL = URL.createObjectURL(blob);
          
                // Create an anchor element
                const downloadLinkSearch = document.createElement('a');
                downloadLinkSearch.href = blobURL;
                downloadLinkSearch.download = fileName; // Set the desired filename
          
                // Append the anchor element to the document body
                document.body.appendChild(downloadLinkSearch);
          
                // Simulate a click event on the anchor element
                downloadLinkSearch.click();
          
                // Clean up the created URL and remove the anchor element
                URL.revokeObjectURL(blobURL);
                document.body.removeChild(downloadLinkSearch);
              })
              .catch(error => {
                console.error('Error downloading blob:', error);
              });
          }
    }

//--------------------------------------------------------------------------------------------------
// SEED SAMPLES DUE FOR VIABILITY TESTING
//--------------------------------------------------------------------------------------------------
//button event listeners
$("#trialsDue5y").on("click", function(){
    listSeedDueForTrial5y()
})

$("#trialsDue3y").on("click", function(){
    listSeedDueForTrial3y()
})

$("#trialsDue3y3350m").on("click", function(){
    listSeedDueForTrial3y3550m()
})

$("#neverTested").on("click", function(){
    listSeedDueForTrialNever()
})

//function to list seed samples not tested in past 5 years
const listSeedDueForTrial5y = () => {
    $.ajax({
        method: "GET",
        url: "/api/getSeedSamplesDueForTrial_5y"
    })
    .then((seedSamples) => {
        seedsDueForTrialResult = []
        $.each(seedSamples, function(i, seedSample){
            seedsDueForTrialResult.push(
                `<tr>
                    <td>${seedSample.scientificName}</td>
                    <td>${seedSample.materialSample_catalogNumber}</td>
                    <td>${seedSample.endDate}</td>
                    <td>${seedSample.numberSeedsTested}</td>
                    <td>${seedSample.viabilityAdjustedGermination}</td>
                    <td>${seedSample.testConductedBy}</td>
                    <td>${seedSample.numberAvailable}</td>
                    <td>${seedSample.eventDate}</td>
                    <td>${seedSample.stateProvince}</td>
                    <td>${seedSample.county}</td>
                    <td>${seedSample.minimumElevationInMeters}</td>
                </tr>`
            )
        })
    })
    .then(function(){
        $('#seedSamplesDueResultTableData').empty()
        $('#seedSamplesDueResultTableData').append(seedsDueForTrialResult.join(''))
        $('#trialsDueResults').show()
        $("#downloadTrialsDueFile").show()
    })
    .catch((error) => {
        console.error(error);
    })
}

//function to list seed samples not tested in past 3 years
const listSeedDueForTrial3y = () => {
    $.ajax({
        method: "GET",
        url: "/api/getSeedSamplesDueForTrial_3y"
    })
    .then((seedSamples) => {
        seedsDueForTrialResult = []
        $.each(seedSamples, function(i, seedSample){
            seedsDueForTrialResult.push(
                `<tr>
                    <td>${seedSample.scientificName}</td>
                    <td>${seedSample.materialSample_catalogNumber}</td>
                    <td>${seedSample.endDate}</td>
                    <td>${seedSample.numberSeedsTested}</td>
                    <td>${seedSample.viabilityAdjustedGermination}</td>
                    <td>${seedSample.testConductedBy}</td>
                    <td>${seedSample.numberAvailable}</td>
                    <td>${seedSample.eventDate}</td>
                    <td>${seedSample.stateProvince}</td>
                    <td>${seedSample.county}</td>
                    <td>${seedSample.minimumElevationInMeters}</td>
                </tr>`
            )
        })
    })
    .then(function(){
        $('#seedSamplesDueResultTableData').empty()
        $('#seedSamplesDueResultTableData').append(seedsDueForTrialResult.join(''))
        $('#trialsDueResults').show()
        $("#downloadTrialsDueFile").show()

    })
    .catch((error) => {
        console.error(error);
    })
}

//function to list seed samples not tested in past 3 years for collections made above 3550m elevation
const listSeedDueForTrial3y3550m = () => {
    $.ajax({
        method: "GET",
        url: "/api/getSeedSamplesDueForTrial_3y_3550m"
    })
    .then((seedSamples) => {
        seedsDueForTrialResult = []
        $.each(seedSamples, function(i, seedSample){
            seedsDueForTrialResult.push(
                `<tr>
                    <td>${seedSample.scientificName}</td>
                    <td>${seedSample.materialSample_catalogNumber}</td>
                    <td>${seedSample.endDate}</td>
                    <td>${seedSample.numberSeedsTested}</td>
                    <td>${seedSample.viabilityAdjustedGermination}</td>
                    <td>${seedSample.testConductedBy}</td>
                    <td>${seedSample.numberAvailable}</td>
                    <td>${seedSample.eventDate}</td>
                    <td>${seedSample.stateProvince}</td>
                    <td>${seedSample.county}</td>
                    <td>${seedSample.minimumElevationInMeters}</td>
                </tr>`
            )
        })
    })
    .then(function(){
        $('#seedSamplesDueResultTableData').empty()
        $('#seedSamplesDueResultTableData').append(seedsDueForTrialResult.join(''))
        $('#trialsDueResults').show()
        $("#downloadTrialsDueFile").show()

    })
    .catch((error) => {
        console.error(error);
    })
}

//function to list seed samples with no germ trial records in the db
const listSeedDueForTrialNever = () => {
    $.ajax({
        method: "GET",
        url: "/api/getSeedSamplesDueForTrial_never"
    })
    .then((seedSamples) => {
        seedsDueForTrialResult = []
        $.each(seedSamples, function(i, seedSample){
            seedsDueForTrialResult.push(
                `<tr>
                    <td>${seedSample.scientificName}</td>
                    <td>${seedSample.materialSample_catalogNumber}</td>
                    <td>${seedSample.endDate}</td>
                    <td>${seedSample.numberSeedsTested}</td>
                    <td>${seedSample.viabilityAdjustedGermination}</td>
                    <td>${seedSample.testConductedBy}</td>
                    <td>${seedSample.numberAvailable}</td>
                    <td>${seedSample.eventDate}</td>
                    <td>${seedSample.stateProvince}</td>
                    <td>${seedSample.county}</td>
                    <td>${seedSample.minimumElevationInMeters}</td>
                </tr>`
            )
        })
    })
    .then(function(){
        $('#seedSamplesDueResultTableData').empty()
        $('#seedSamplesDueResultTableData').append(seedsDueForTrialResult.join(''))
        $('#trialsDueResults').show()
        $("#downloadTrialsDueFile").show()

    })
    .catch((error) => {
        console.error(error);
    })
}

$("#downloadTrialsDueFile").on("click", function() {
    exportTrialsDueResults()
})

const exportTrialsDueResults = (req,res) => {
    $.ajax({
        url: "/api/exportTrialsDueResults",
        method: "POST",
    })
    .then((res) => {
        console.log(res)
        trialsDueResultsCSVFileName = res
    })
    .then(function(){
        downloadTrialsDueFileFromBackend()
    })
    .catch((error) => {
        console.error(error);
    })
}

function downloadTrialsDueFileFromBackend() {
    $.ajax({
        url: "/api/downloadTrialsDueFile/"+trialsDueResultsCSVFileName,
        method: "GET"
    })
    .then(function() {
        downloadBlobFromURL('http://localhost:8080/api/downloadTrialsDueFile/'+trialsDueResultsCSVFileName, trialsDueResultsCSVFileName);
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
// SEARCH COLLECTIONS
//--------------------------------------------------------------------------------------------------
//these feature gives the user a simpler look at out holding by combining material samples in to collecitons, grouping by sample type, eventDate, scientificName, and locality

//add user entries to searchFormEntires object
    let searchCollectionsProject = $("#searchCollectionsProject")
    let searchCollectionsScientificName = $("#searchCollectionsScientificName")
    let searchCollectionsMaterialSampleType = $("#searchCollectionsMaterialSampleType")
    let searchCollectionsSpecimenCatalogNumber = $("#searchCollectionsSpecimenCatalogNumber")
    let searchCollectionsEventEarlyDate = $("#searchCollectionsEventEarlyDate")
    let searchCollectionsEventLateDate = $("#searchCollectionsEventLateDate")
    let searchCollectionsRecordedBy = $("#searchCollectionsRecordedBy")
    let searchCollectionsRecordNumber = $("#searchCollectionsRecordNumber")
    let searchCollectionsStateProvince = $("#searchCollectionsStateProvince")
    let searchCollectionsCounty = $("#searchCollectionsCounty")
    let searchCollectionsLocality = $("#searchCollectionsLocality")
    let selectedCollectionsLocalityOption
    let searchCollectionsLocationRemarks = $("#searchCollectionsLocationRemarks")
    let searchCollectionsLocationID = $("#searchCollectionsLocationID")
    $('input[name="localityRadio"]').click(function() {
        selectedCollectionsLocalityOption = $('input[name="localityRadio"]:checked').val();
    })
    $("#searchCollectionsForm").on("submit", function handleFormSubmit(event){
        event.preventDefault()
        let optradio
        if (selectedCollectionsLocalityOption == "contains"){
            optradio = "contains"
        } else if (selectedCollectionsLocalityOption == "startsWith"){
            optradio = "startsWith"
        } else if (selectedCollectionsLocalityOption == "isExactly"){
            optradio = "isExactly"
        } else if (selectedCollectionsLocalityOption === undefined){
            optradio = ""
        } else {
            alert("Please the locality components of your query")
        }
        let newSearchCollectionsEntries = {
            project: searchCollectionsProject.val(),
            scientificName: searchCollectionsScientificName.val(),
            materialSampleType: searchCollectionsMaterialSampleType.val(),
            catalogNumber: searchCollectionsSpecimenCatalogNumber.val(),
            eventEarlyDate: searchCollectionsEventEarlyDate.val(),
            eventLateDate: searchCollectionsEventLateDate.val(),
            recordedBy: searchCollectionsRecordedBy.val(),
            recordNumber: searchCollectionsRecordNumber.val(),
            stateProvince: searchCollectionsStateProvince.val(),
            county: searchCollectionsCounty.val(),
            locality: searchCollectionsLocality.val(),
            optradio: optradio,
            locationRemarks: searchCollectionsLocationRemarks.val(),
            locationID: searchCollectionsLocationID.val()
        }
        searchCollectionsFormEntires = newSearchCollectionsEntries
        console.log(searchCollectionsFormEntires)
        submitCollectionSearch()
    })
    //send to backend via api
    const submitCollectionSearch = () => {
        $.ajax({
            method: "POST",
            url: "/api/searchCollections",
            data: searchCollectionsFormEntires
        })
        //return results
        .then((searchCollectionsResults) => {
            searchCollectionsResultsList = []
            //display results in list
            $.each(searchCollectionsResults, function(i, resultFromCollectionSearch) {
                searchCollectionsResultsList.push(
                    `<tr>
                    <td>${resultFromCollectionSearch.scientificName}</td>
                    <td>${resultFromCollectionSearch.materialSampleType}</td>
                    <td>${resultFromCollectionSearch.eventDate}</td>
                    <td>${resultFromCollectionSearch.recordedBy}</td>
                    <td>${resultFromCollectionSearch.totalNumberCollected}</td>
                    <td>${resultFromCollectionSearch.totalNumberAvailable}</td>
                    <td>${resultFromCollectionSearch.stateProvince}</td>
                    <td>${resultFromCollectionSearch.county}</td>
                    <td>${resultFromCollectionSearch.locality}</td>
                    <td>${resultFromCollectionSearch.locationID}</td>
                    <td>${resultFromCollectionSearch.locationRemarks}</td>
                    </tr>`
                )
            })
        })
        .then(function(){
            $('#searchCollectionsResultTableData').empty()
            $('#searchCollectionsResultTableData').append(searchCollectionsResultsList.join(''))
            $('#searchCollectionsResults').show()
            $("#downloadCollectionsSearchResults").show()
        })
        .catch((error) => {
            console.error(error);
        })
    }

//--------------------------------------------------------------------------------------------------
// DOWNLOAD SEARCH COLLECTIONS RESULTS TO CLIENT AS CSV
//--------------------------------------------------------------------------------------------------
    //event listener for download results button
    $("#downloadCollectionsSearchResults").on("click", function(){
        exportSearchCollectionsResults()
    })

    //create the csv of materialSample results on the back end
    const exportSearchCollectionsResults = (req,res) => {
        $.ajax({
            url: "/api/exportSearchCollectionsToCSV",
            method: "POST",
        })
        .then((res) => {
            searchCollectionsResultsCSVFileName = res
        })
        .then(function(){
            downloadSearchCollectionsResultsFileFromBackend()
        })
        .catch((error) => {
            console.error(error);
        })
    }

    //function to send csv to client
    function downloadSearchCollectionsResultsFileFromBackend() {
        $.ajax({
            url: "/api/downloadSearchCollectionsResultsFile/"+searchCollectionsResultsCSVFileName,
            method: "GET"
        })
        .then(function() {
            downloadBlobFromURL('http://localhost:8080/api/downloadSearchCollectionsResultsFile/'+searchCollectionsResultsCSVFileName, searchCollectionsResultsCSVFileName);
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
// MORE EVENT LISTENERS
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