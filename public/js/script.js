$(document).ready(function() {
    console.log("hi")
    //--------------------------------------------------------------------------------------------------
    //GLOBAL VARIABLES
    //--------------------------------------------------------------------------------------------------
    //Search Form
    let searchFormEntires = {}
    
    //New Project Form
    let newProjectFormEntries = {}
    
    //Projects List
    let projectsLit = []

    //Project Selection
    let projectSelection = []
    
    //Search Germination Trials Form
    let searchGermTrialsFormEntries = {}

    //Search for Seed to add to Germinamtion Trial Form
    let searchSeedForGermTrialFormEntries = {}

    //New Germination Trial Form
    let newGermTrialFormEntries = {}

    //Add Viability Tracking Form
    let addViabilityTrackingFormEntries = {}

    //Finish Germination Trial Form
    let finsihGermTrialFormEntries = {}

    //Search For Transfers Form
    let searchTransfersFormEntries = {}

    //Search for Material Samples to Transfer Form
    let searchSamplesToTransferFormEntries = {}

    //New Transfer Form
    let newTransferFormEntries = {}

    //Update Transfer Form
    let updatTransferFormEntries = {}

    //Search for Material Sample to Update Form
    let searchSamplesToUpdateFormEntries = {}

    //Update Material Sample Form
    let updateMaterialSampleFormEntries = {}

//--------------------------------------------------------------------------------------------------
// EVENT LISTENERS
//--------------------------------------------------------------------------------------------------
// //Hide Elements
//     //Search Page
//     $('#searchResults').hide()

//     //Germination Trials Page
//     $('#searchGermTrialResults').hide()

//     //Create New Germination Trial Page
//     $('#seedSearchGermTrialResults').hide()
//     $('#newGermTrialDataForm').hide()

//     //Transfers Page
//     $('#searchTransfersResults').hide()

//     //New Transfer Page
//     $('#searchMaterialSampleToTransferResults').hide()
//     $('#newTransferDataForm').hide()

//     //Update Material Sample Page
//     $('#searchSamplesToUpdateResults').hide()
//     $('#sampleUpdatesForm').hide()

//Functions Executed On Page Load
    //Get Projects and Display on Projects Page

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

})