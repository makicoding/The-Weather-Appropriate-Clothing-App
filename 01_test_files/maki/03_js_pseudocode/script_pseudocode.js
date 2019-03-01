// PSEUDO CODE

// ------------------------------------------------------------
// GLOBAL VARIABLES

var clothing = [];                      // Empty array for clothing that will be populated dynamically

var loTemperatureForAllDays = [];       // Empty array for Lo temperature for all days that will be populated dynamically
var weatherForAllDays = [];             // Empty array for weather for all days that will be populated dynamically

var loTemperature = 0;
var weather = 0;

var gender = "0";

// All clothing items are set to false to begin with
var sunscreen = false;
var sunglasses = false;
var summerHatWomen = false;

// the rest of the clothing variables need to go here...



// ------------------------------------------------------------
// AJAX CALL TO WEATHER API

var searchDates = []                    // Empty array for search dates that will be populated dynamically

var searchDateStart = // need to define
var searchDateEnd = // need to define

// Need to figure out a way to populated searchDates array with the searchDateStart, all dates in between, and searchDateEnd

for (var i = 0; i < searchDates.length; i++) {
//      AJAX call to Weather API goes here
//      Push lo temperature for all days [i] to loTemperatureForAllDays array in Global Variables
//      Push weather for all days [i] to weatherForAllDays array in Global Variables
};



// ------------------------------------------------------------
// IF STATEMENTS FOR TEMPERATURE

// need to decide what temperature unit to use: kelvin, celsius, fahrenheit?  The following is in celsius for now

for (var j = 0; j < loTemperatureForAllDays.length; j++) {
    if (loTemperature >= 20) {

        if (gender === "female") {
            summerHatWomen = true;
            skirt = true;
        }

        else if (gender === "male") {
            summerCapMen = true;
            shorts = true;
        }

    }

    else if (loTemperature >= 15 && loTemperature <= 19) {

        // if statements for gender go here...

    }

    // if statements for other loTemperature thresholds and gender type need to go here...

}



// ------------------------------------------------------------
// IF STATEMENTS FOR TEMPERATURE

for (var k = 0; k < weatherForAllDays.length; k++) {
    
    if (weather === sun || weather === sunny) {
        sunscreen = true;
        sunglasses = true;
    }

    else if (weather === wind || weather === windy) {
        pants = true;
    }

    // if statements for other weather types need to go here...

}



// ------------------------------------------------------------
// IF STATEMENTS FOR CLOTHING

if (sunscreen === true) {
    // push sunscreen to var clothing array
}

if (sunglasses === true) {
    // push sunglasses to var clothing array
}

// if statements for other clothing need to go here...



// ------------------------------------------------------------
// FOR LOOP TO CREATE CLOTHING BUTTONS ON HTML

for (var l = 0; l < clothing.length; l++) {

    var clothingIcon = document.createElement("div");                           // Create <div> element
    clothingIcon.setAttribute("id", "iconDiv");                                 // Set Attribute for clothingIcon to have id="iconDiv"
    clothingIcon.setAttribute("data-clothingType", clothing[i])                 // Set Attribute for clothingIcon to have a data attribute: data-clothingType
    var clothingIconText = document.createTextNode(clothing[i]);                // Create a text node with the clothing 
    clothingIcon.appendChild(clothingIconText);                                 // Append the text to clothingIcon
    document.getElementById("iconsAppearHereDiv").appendChild(clothingIcon);    // Append clothingIcon to iconAppearHereDiv
    clothingIcon.addEventListener("click", googleShopping);                     // When clothingIcon is clicked, the function googleShopping is called 

}



// ------------------------------------------------------------
// FUNCTION TO CALL GOOGLE SHOPPING API

function googleShopping() {

    var keyword = this.getAttribute("data-clothingType");                       // here "this" refers to "clothingIcon"

    // AJAX call go Google Shopping API goes here.  Insert above var keyword into the search query
    // So therefore:  
        _________ + keyword + __________
    
        var googleShoppingButtons = // need to define

        document.getElementById("clothingAppearHereDiv").appendChild(googleShoppingButtons);

}