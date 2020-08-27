//function to get the bath value picked
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");  //get all the values in the options
    for(var i in uiBathrooms) {     //iterate through uiBathrooms to get the indexof each
      if(uiBathrooms[i].checked) {  //get the value that is checked
          return parseInt(i)+1;     //change the indexed value to the original value and return
      }
    }
    return -1; // Invalid Value
  }
  
  //function to get the BHK value picked
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");   //get all the values in the options
    for(var i in uiBHK) {           //itereate through to get the index of each
      if(uiBHK[i].checked) {         //get the value that is checked
          return parseInt(i)+1;       //change the indexed value to the original value and return
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft"); //get the value of the sqft given
    var bhk = getBHKValue();             //get the value of the bhk
    var bathrooms = getBathValue();     //get the value of the bath
    var location = document.getElementById("uiLocations");   // get the value of the location
    var estPrice = document.getElementById("uiEstimatedPrice");  //get the estimated price
  
    var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx 
    //var url = "/api/predict_home_price"; // Use this if  you are using nginx
    
    //send the data to the serverside for execution
    //make a post request to the server endpoint
    $.post(url, {
        total_sqft: parseFloat(sqft.value), //get the sqft
        bhk: bhk,    //get the bhk value
        bath: bathrooms,  //getthe bath value
        location: location.value  //get the location
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
  
  //function to get locations on page load
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/location_names"; // Use this if you are NOT using nginx 
    //var url = "/api/get_location_names"; // Use this if  you are using nginx

    //make a get request to the server end point
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations; //get the locations
            var uiLocations = document.getElementById("uiLocations"); //get the selected location by the user
            $('#uiLocations').empty(); //remove any selected loation after execution

            for(var i in locations) {                 // this is to get the complete locations from the url
                var opt = new Option(locations[i]);  //create a new objet Option and index each location
                $('#uiLocations').append(opt);       //append all the locations gotten to the select tag
            }
        }
    });
  }
  
  window.onload = onPageLoad;