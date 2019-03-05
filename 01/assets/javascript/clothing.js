$(document).ready(function(){

  $("button").on("click", function () {
console.log($("#location").val());

// GLOBAL VARIABLES
var clothing = [];                      // Empty array for clothing that will be populated dynamically
//
var loTemperatureForAllDays = [];       // Empty array for Lo temperature for all days that will be populated dynamically
var weatherForAllDays = [];             // Empty array for weather for all days that will be populated dynamically

var loTemperature = "0";
var weather = "0";
var gender = "0";

// All clothing items are set to false to begin with
var sunscreen = false;
var sunglasses = false;
var summerHatWomen = false;
var summerCapMen = false;
var skirt = false;
var shorts = false;
var sweater = false;
var pants = false;
var jacketWomen = false;
var jacketMen = false;
var umbrella = false;
var rainBoots = false;
var winterCoatWomen = false;
var winterJacketMen = false;
var thermalUnderwearTop = false;
var thermalUnderwearBottom = false;
var scarf = false;
var gloves = false;
var winterHat = false;
var snowBoots = false;

//
//// the rest of the clothing variables need to go here...
//
//
//
//// ------------------------------------------------------------
//// AJAX CALL TO WEATHER API
$.ajax({
  url: `${proxy}https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/${coordinates.lat},${coordinates.lng},${travelDate[i]}?units=${units}`,         headers: { 'Access-Control-Allow-Origin': '*' },
  method: "GET"
})

//var searchDates = []                    // Empty array for search dates that will be populated dynamically
//
//var searchDateStart = // need to define
//var searchDateEnd = // need to define
//
//// Need to figure out a way to populated searchDates array with the searchDateStart, all dates in between, and searchDateEnd
//
//for (var i = 0; i < searchDates.length; i++) {
////      AJAX call to Weather API goes here
////      Push lo temperature for all days [i] to loTemperatureForAllDays array in Global Variables
////      Push weather for all days [i] to weatherForAllDays array in Global Variables
//};
//
//
//
//// ------------------------------------------------------------
//// IF STATEMENTS FOR TEMPERATURE
//
//// need to decide what temperature unit to use: kelvin, celsius, fahrenheit?  The following is in celsius for now
//
for (var j = 0; j < loTemperatureForAllDays.length; j++) {
  if (loTemperature >= 68) {

    if (gender === "female") {
        summerHatWomen = true;
        skirt = true;
    }

    else if (gender === "male") {
      summerCapMen = true;
      shorts = true;    
    }

  }

  if ((loTemperature > 58) && (loTemperature < 68)) {

    if (gender === "female") {
        sweater = true;
        pants = true;
    }

    else if (gender === "male") {
      sweater = true;
      pants = true;
        }

  }
  
  if ((loTemperature > 50) && (loTemperature < 59)) {

    if (gender === "female") {
        jacketWomen = true;
        pants = true;
    }

    else if (gender === "male") {
      jacketMen = true;
      pants = true;
        }

  }

  if (loTemperature <= 50) {

        if (gender === "female") {
            pants = true;
            winterCoatWomen = true;
            thermalUnderwearBottom = true;
            thermalUnderwearTop = true;
            scarf = true;
            gloves = true;
            winterHat = true;
        }

        else if (gender === "male") {
          pants = true;
          winterJacketMen = true;
          thermalUnderwearBottom = true;
          thermalUnderwearTop = true;
          scarf = true;
          gloves = true;
          winterHat = true;
        }

      }
//
//        // if statements for gender go here...
//
//    }
//
//    // if statements for other loTemperature thresholds and gender type need to go here...
//
//}
//
//
//
//// ------------------------------------------------------------
//// IF STATEMENTS FOR WEATHER
//
for (var k = 0; k < weatherForAllDays.length; k++) { 
    if (weather === "sun" || weather === "sunny") {
      sunscreen = true;
      sunglasses = true;
        console.log("wear sunscreen and sunglasses");
    };

    if (weather === "wind" || weather === "windy") {
      pants = true;
      console.log("need pants!");
    };

    if (weather === "rain" || weather === "light rain" || weather === "showers" || weather === "heavy rain" || weather === "thunderstorm" || weather === "hail" || weather === "partly cloudy" || weather === "mostly cloudy") {
      umbrella = true;
      rainBoots = true;
      console.log("need umbrella and rain boots!");
    };

    if (weather === "snow" || weather === "light snow" || weather === "snow showers" || weather === "heavy snow") {
      umbrella = true;
      rainBoots = true;
      console.log("need umbrella and rain boots!");
    };

    if (weather === "sleet") {
      umbrella = true;
      rainBoots = true;
      console.log("need umbrella and rain boots!");
    };

    // if statements for other weather types need to go here...
//
//}
//
//
//
//// ------------------------------------------------------------
//// IF STATEMENTS FOR CLOTHING
//
//if (sunscreen === true) {
//    // push sunscreen to var clothing array
//}
//
//if (sunglasses === true) {
//    // push sunglasses to var clothing array
//}
//
//// if statements for other clothing need to go here...
//
//
//
//// ------------------------------------------------------------
//// FOR LOOP TO CREATE CLOTHING BUTTONS ON HTML
//
//for (var l = 0; l < clothing.length; l++) {
//
//    var clothing = document.createElement("div");                           // Create <div> element
//    clothing.setAttribute("id", "Div");                                 // Set Attribute for clothing to have id="Div"
//    clothing.setAttribute("data-clothingType", clothing[i])                 // Set Attribute for clothing to have a data attribute: data-clothingType
//    var clothingText = document.createTextNode(clothing[i]);                // Create a text node with the clothing 
//    clothing.appendChild(clothingText);                                 // Append the text to clothing
//    document.getElementById("sAppearHereDiv").appendChild(clothing);    // Append clothing to AppearHereDiv
//    clothing.addEventListener("click", googleShopping);                     // When clothing is clicked, the function googleShopping is called 
//
//}
//
//
//
//// ------------------------------------------------------------
//// FUNCTION TO CALL GOOGLE SHOPPING API
//
//function googleShopping() {
//
//    var keyword = this.getAttribute("data-clothingType");                       // here "this" refers to "clothing"
//
//    // AJAX call go Google Shopping API goes here.  Insert above var keyword into the search query
//    // So therefore:  
//        _________ + keyword + __________
//    
//        var googleShoppingButtons = // need to define
//
//        document.getElementById("clothingAppearHereDiv").appendChild(googleShoppingButtons);
//
//}
//
//

/*
    var queryURL = "https://api.macys.com/v4/catalog/search?searchphrase=search_keywords" + subject + "&api-key=cdkjnhkyu9mu5k38m8pp62y7";

$.ajax({
    url: queryURL,
    method: "GET"
})

    .then(function(response) {

        console.log(response);

        
        var results = response.response.docs;

        // var results2 = results.map(function(item){
        //     return item.web_url;
        // })

        for (var i=0; i < results.length; i++) {
            var category = results[i].category.main;
            var itemDescription = results[i].description;
            var price = results[i].pricing;
            var clothingUrl = results[i].web_url;

            $(".clothingLister").append(`
                <div class="card mb-3" style="max-width: 760px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="t_logo_291_black.png" class="card-img" alt="macyslogo">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${category}</h5>
                        <p class="card-snip">${itemDescription}</p>
                        <p class="card-auth">${price}</p>
                        <a href="${clothingUrl}">Click Here for Item</a>
                    </div>
                  </div>
                </div>
              </div>`
                );



            
        };
    });
    */
//});
//});
