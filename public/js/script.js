$(document).ready(function() {
    //--------------------------------------------------------------------------------------------------
    //GLOBAL VARIABLES
    //--------------------------------------------------------------------------------------------------
    //Search Form
    //an object to contain the values entered by the user into the form on the Search page
    let searchFormEntires = {}
    
    //New Project Form
    //an object to contain the values entered by the user into the form to create a new project
    let newProjectFormEntries = {}
    
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
    //send to backend via api


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

//Capture id For Selected Project
    // send to backend csvUplaod controller to be incorporated into data being uploaded

//Send csv to backend for upload to database

//Search Germination Trials
    //add user entries to searchGermTrialsFormEntries object
    //send to backend via api
    //return results
    //display results in list sorted by taxon and then date

//Download Germination Trial Search Results to CSV

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

//Create New Germination Trial
    //event listener for button to capture ID of selected seed for new germination trial
    //add user entries to newGermTrialFormEntries object
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
//Functions Executed On Page Load
    //Get Projects and Display on Projects Page
    fetchProjects()
})