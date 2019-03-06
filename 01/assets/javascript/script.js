console.log("JavaScript connected!");

// Reset button - refreshes page to home page------------------------
$("#buttonReset1").click(function(){
  document.location.reload(true);
});
// GLOBAL VARIABLES

// Gender

//var userGender = document.getElementById("inputGender").value;
var userGender = ""

// ------------------------------
// Clothing items (set to false to begin with)

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

// ------------------------------
// Clothing Array

var clothingArray = [];             // An empty array for clothing that will be populated depending on the temperature and weather

// All the different clothing options available: "Sunscreen", "Sunglasses", "Women's Summer Hat", "Men's Cap", "Skirt", "Shorts", "Sweater", "Pants", "Women's Jacket", "Men's Jacket", "Umbrella", "Rain Boots", "Women's Winter Coat", "Men's Winter Jacket", "Thermal Underwear Top", "Thermal Underwear Bottom", "Scarf", "Gloves", "Winter Hat", "Snow Boots"


// --------------------------------------------------------------------------------
// FUNCTION TO CALL DARKSKY WEATHER API & GOOGLE MAPS API

// Dark Sky API key: b9dc6901023a8337df6a5c58be197ba0
// Google Maps API Key: AIzaSyBrwwwbvDLEEipFn_nr9sUtcVWqRugE2OA


// Darksky icon (machine readable text summary):
// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, partly-cloudy-night, hail, thunderstorm, tornado


var destination;
var units;
var travelDate;


var datePicker = function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left',
    timeZone: 'utc'
  }, function (start, end, label) {
    var dateArray = [];
    while (start <= end) {
      dateArray.push(moment(start).unix());
      start = (moment(start).add(1, 'days'));
    }
    travelDate = dateArray;
  });
}


var userInput = function () {
  userGender = $("#inputGender").val();
  destination = $("#inputLocation").val();
  units = $("#inputUnits").val();
}


var setWeather = async function () {
  var proxy = 'https://cors-anywhere.herokuapp.com/'
  var weatherArray = [];
  var results = await $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=AIzaSyBQl-QMKAwNvWndyQcRfqlz39Ke6xZcb5w`,
    method: "Get"
  });
  // console.log(results);
  var coordinates = results.results[0].geometry.location;
  var formDestination = results.results[0].formatted_address;
  $(`<div id="outputLocation">Expected temperature range in ${formDestination} is going to be: <div>`).appendTo("#weatherInfoDiv");


  for (i = 0; i < travelDate.length; i++) {
    var innerRes = await $.ajax({
      url: `${proxy}https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/${coordinates.lat},${coordinates.lng},${travelDate[i]}?units=us`,   // you could also change units=${units} to use the temperature selector fahrenheit and celsius.  At the moment units=us to run the calculations in fahrenheit
      headers: { 'Access-Control-Allow-Origin': '*' },
      method: "GET"
    });
    var weatherData = innerRes.daily.data[0];

    var weatherDay = moment.unix(innerRes.currently.time).format("YYYY-MM-DD");

    var object = {
      date: weatherDay,
      tempHi: weatherData.temperatureHigh,
      tempLo: weatherData.temperatureLow,
      summary: weatherData.summary,
      icon: weatherData.icon,
    };

    weatherArray.push(object);
  }
  return weatherArray;

}
// Code for Time Converter
// celsius: temperatureConverter,
// <div id="outputCelsius">Celsius: ${element.temperatureConverter}</div>
//     function temperatureConverter(valNum) {
//  valNum = parseFloat(valNum);
//  document.getElementById("outputCelsius").innerHTML = (valNum-32) / 1.8;
// }

var populateWeatherDate = function (x) {
  x.forEach((element) => {
    $(`<br>
    <div id="outputDate">Date: ${element.date}</div>
    <div id="outputTempHi">Temperature High: ${element.tempHi}</div>
    <div id="outputTempLo">Temperature Low: ${element.tempLo}</div>
    <div id="outputSummary"> ${element.summary}</div>
    <div id="icon">${element.icon}</div>
    <br>
    `).appendTo("#weatherInfoDiv");
    $("#appContainer2").show();
    $("#appContainer1").hide();

  });
}


var handleSubmit = async function () {
  userInput();
  var weatherArray = await setWeather();
  populateWeatherDate(weatherArray);
  populateRecommendation(weatherArray)

}


$(document).ready(function () {
  datePicker();
  $('#buttonSubmit').click(handleSubmit);
  $("#appContainer1").show();
  $("#appContainer2").hide();
});


// --------------------------------------------------------------------------------
// IF STATEMENTS FOR TEMPERATURE

// Temperature in Fahrenheit

var populateRecommendation = function(weatherArray){

for (var k = 0; k < weatherArray.length; k++) {
  if (weatherArray[k].tempLo >= 68) {

      if (userGender === "female") {
          summerHatWomen = true;
          skirt = true;
      }
  
      else if (userGender === "male") {
          summerCapMen = true;
          shorts = true;    
      }

  }

  else if ((weatherArray[k].tempLo >= 59) && (weatherArray[k].tempLo < 68)) {

      if (userGender === "female") {
          sweater = true;
          pants = true;
      }
  
      else if (userGender === "male") {
          sweater = true;
          pants = true;
          }

  }
  
  else if ((weatherArray[k].tempLo > 50) && (weatherArray[k].tempLo < 59)) {

      if (userGender === "female") {
          pants = true;
          jacketWomen = true;
      }
  
      else if (userGender === "male") {
          pants = true;
          jacketMen = true;
          }

  }

  else if (weatherArray[k].tempLo <= 50) {

      if (userGender === "female") {
          pants = true;
          winterCoatWomen = true;
          thermalUnderwearTop = true;
          thermalUnderwearBottom = true;
          scarf = true;
          gloves = true;
          winterHat = true;
      }

      else if (userGender === "male") {
          pants = true;
          winterJacketMen = true;
          thermalUnderwearTop = true;
          thermalUnderwearBottom = true;
          scarf = true;
          gloves = true;
          winterHat = true;
          }

  }

};

console.log("sweater: " + sweater);
console.log("pants: " + pants);
console.log("winterJacketMen: " + winterJacketMen);
console.log("winterCoatWomen: " + winterCoatWomen);


// --------------------------------------------------------------------------------
// IF STATEMENTS FOR WEATHER

for (var l = 0; l < weatherArray.length; l++) { 
  if (weatherArray[l].icon === "clear-day") {
      sunscreen = true;
      sunglasses = true;
      console.log("Wear sunscreen and sunglasses!");
  }

  else if (weatherArray[l].icon === "wind" || weatherArray[l].icon === "tornado") {
      pants = true;
      console.log("Need pants!");
  }

  else if (weatherArray[l].icon === "rain" || weatherArray[l].icon === "sleet" || weatherArray[l].icon === "hail" || weatherArray[l].icon === "thunderstorm") {
      umbrella = true;
      rainBoots = true;
      console.log("Need umbrella and rain boots!");
  }

  else if (weatherArray[l].icon === "snow") {
      umbrella = true;
      snowBoots = true;
      console.log("Need umbrella and snow boots!");
  }
};


// --------------------------------------------------------------------------------
// IF STATEMENTS FOR CLOTHING

if (sunscreen === true) {
  clothingArray.push("Sunscreen");                    // push "Sunscreen" to var clothingArray
};

if (sunglasses === true) {
  clothingArray.push("Sunglasses");                   // push "Sunglasses" to var clothingArray
};

if (summerHatWomen === true) {
  clothingArray.push("Women's Summer Hat");           // push "Women's Summer Hat" to var clothingArray
};

if (summerCapMen === true) {
  clothingArray.push("Men's Cap");                    // push "Men's Cap" to var clothingArray
};

if (skirt === true) {
  clothingArray.push("Skirt");                        // push "Skirt" to var clothingArray
};

if (shorts === true) {
  clothingArray.push("Shorts");                       // push "Shorts" to var clothingArray
};

if (sweater === true) {
  clothingArray.push("Sweater");                      // push "Sweater" to var clothingArray
};

if (pants === true) {
  clothingArray.push("Pants");                        // push "Pants" to var clothingArray
};

if (jacketWomen === true) {
  clothingArray.push("Women's Jacket");               // push "Women's Jacket" to var clothingArray
};

if (jacketMen === true) {
  clothingArray.push("Men's Jacket");                 // push "Men's Jacket" to var clothingArray
};

if (umbrella === true) {
  clothingArray.push("Umbrella");                     // push "Umbrella" to var clothingArray
};

if (rainBoots === true) {
  clothingArray.push("Rain Boots");                   // push "Rain Boots" to var clothingArray
};

if (winterCoatWomen === true) {
  clothingArray.push("Women's Winter Coat");          // push "Women's Winter Coat" to var clothingArray
};

if (winterJacketMen === true) {
  clothingArray.push("Men's Winter Jacket");          // push "Men's Winter Jacket" to var clothingArray
};

if (thermalUnderwearTop === true) {
  clothingArray.push("Thermal Underwear Top");        // push "Thermal Underwear Top" to var clothingArray
};

if (thermalUnderwearBottom === true) {
  clothingArray.push("Thermal Underwear Bottom");     // push "Thermal Underwear Bottom" to var clothingArray
};

if (scarf === true) {
  clothingArray.push("Scarf");                        // push "Scarf" to var clothingArray
};

if (gloves === true) {
  clothingArray.push("Gloves");                       // push "Gloves" to var clothingArray
};

if (winterHat === true) {
  clothingArray.push("Winter Hat");                   // push "Winter Hat" to var clothingArray
};

if (snowBoots === true) {
  clothingArray.push("Snow Boots");                   // push "Snow Boots" to var clothingArray
};

console.log(clothingArray);


// --------------------------------------------------------------------------------
// CREATE CLOTHING BUTTONS ON HTML

// All clothing items as objects that contain image URL and keyword

var itemSunscreen = {
  image: "assets/icons/100px_iconSunscreen.png",
  keyword: "Sunscreen"
}

var itemSunglasses = {
  image: "assets/icons/100px_iconSunglasses.png",
  keyword: "Sunglasses"
}

var itemSummerHatWomen = {
  image: "assets/icons/100px_iconSummerHatWomen.png",
  keyword: "Women's Summer Hat"
}

var itemSummerCapMen = {
  image: "assets/icons/100px_iconSummerCapMen.png",
  keyword: "Men's Cap"
}

var itemSkirt = {
  image: "assets/icons/100px_iconSkirt.png",
  keyword: "Skirt"
}

var itemShorts = {
  image: "assets/icons/100px_iconShorts.png",
  keyword: "Shorts"
}

var itemSweater = {
  image: "assets/icons/100px_iconSweater.png",
  keyword: "Sweater"
}

var itemPants = {
  image: "assets/icons/100px_iconPants.png",
  keyword: "Pants"
}

var itemJacketWomen = {
  image: "assets/icons/100px_iconJacketWomen.png",
  keyword: "Women's Jacket"
}

var itemJacketMen = {
  image: "assets/icons/100px_iconJacketMen.png",
  keyword: "Men's Jacket"
}

var itemUmbrella = {
  image: "assets/icons/100px_iconUmbrella.png",
  keyword: "Umbrella" 
}

var itemRainBoots = {
  image: "assets/icons/100px_iconRainBoots.png",
  keyword: "Rain Boots"
}

var itemWinterCoatWomen = {
  image: "assets/icons/100px_iconWinterCoatWomen.png",
  keyword: "Women's Winter Coat"
}

var itemWinterJacketMen = {
  image: "assets/icons/100px_iconWinterJacketMen.png",
  keyword: "Men's Winter Jacket"
}

var itemThermalUnderwearTop = {
  image: "assets/icons/100px_iconThermalUnderwearTop.png",
  keyword: "Thermal Underwear Top"
}

var itemThermalUnderwearBottom = {
  image: "assets/icons/100px_iconThermalUnderwearBottom.png",
  keyword: "Thermal Underwear Bottom"
}

var itemScarf = {
  image: "assets/icons/100px_iconScarf.png",
  keyword: "Scarf"
}

var itemGloves = {
  image: "assets/icons/100px_iconGloves.png",
  keyword: "Gloves"
}

var itemWinterHat = {
  image: "assets/icons/100px_iconWinterHat.png",
  keyword: "Winter Hat"
}

var itemSnowBoots = {
  image: "assets/icons/100px_iconSnowBoots.png",
  keyword: "Snow Boots"
}


// Create Icons

function createIcon(clothing) {                                                 // For the function createIcon, we pass through clothing
  var clothingIcon = document.createElement("div");                           // Create <div> element
  clothingIcon.setAttribute("class", "iconDiv");                              // Set Attribute for clothingIcon to have class="iconDiv"
  clothingIcon.setAttribute("data-clothingkeyword", clothing.keyword);        // Set Attribute for clothingIcon to have a data attribute: data-clothingkeyword (clothingkeyword must be in lowercase for this to work!)
  var clothingIconImage = document.createElement("img");                      // Create <img> element
  clothingIconImage.setAttribute("src", clothing.image);                      // Set Attribute for clothingIconImage to have a source which references the image URL in the above objects
  clothingIconImage.setAttribute("class", "iconImage");                       // Set Attribute for clothingIcon to have class="iconImage"
  var clothingIconText = document.createTextNode(clothing.keyword);           // Create a text node with the string in item in the above objects 
  var clothingIconTextContainer = document.createElement("div");              // Create <div> element
  clothingIconTextContainer.setAttribute("class", "iconText");                // Set Attribute for clothingIconTextContainer to have class="iconText"
  clothingIconTextContainer.appendChild(clothingIconText);                    // Append clothingIconText to clothingIconTextContainer
  clothingIcon.appendChild(clothingIconImage);                                // Append clothingIconImage to clothingIcon
  clothingIcon.appendChild(clothingIconTextContainer);                        // Append clothingIconText to clothingIcon                    
  document.getElementById("iconsAppearHereDiv").appendChild(clothingIcon);    // Append clothingIcon to iconAppearHereDiv
  clothingIcon.addEventListener("click", shopping);                         // When clothingIcon is clicked, the function hmShopping is called    
}


for (var i = 0; i < clothingArray.length; i++) {
  if (clothingArray[i] === "Sunscreen") {
      createIcon(itemSunscreen);                                  // Call the function createIcon and pass through itemSunscreen in place of where clothing is
  }
  else if (clothingArray[i] === "Sunglasses") {
      createIcon(itemSunglasses);                                 // Call the function createIcon and pass through itemSunglasses in place of where clothing is
  }
  else if (clothingArray[i] === "Women's Summer Hat") {
      createIcon(itemSummerHatWomen);                             // Call the function createIcon and pass through itemSummerHatWomen in place of where clothing is
  }
  else if (clothingArray[i] === "Men's Cap") {
      createIcon(itemSummerCapMen);                               // Call the function createIcon and pass through itemSummerCapMen in place of where clothing is
  }
  else if (clothingArray[i] === "Skirt") {
      createIcon(itemSkirt);                                      // Call the function createIcon and pass through itemSkirt in place of where clothing is
  }
  else if (clothingArray[i] === "Shorts") {
      createIcon(itemShorts);                                     // Call the function createIcon and pass through itemShorts in place of where clothing is
  }
  else if (clothingArray[i] === "Sweater") {
      createIcon(itemSweater);                                    // Call the function createIcon and pass through itemSweater in place of where clothing is
  }
  else if (clothingArray[i] === "Pants") {
      createIcon(itemPants);                                      // Call the function createIcon and pass through itemPants in place of where clothing is
  }
  else if (clothingArray[i] === "Women's Jacket") {
      createIcon(itemJacketWomen);                                // Call the function createIcon and pass through itemJacketWomen in place of where clothing is
  }
  else if (clothingArray[i] === "Men's Jacket") {
      createIcon(itemJacketMen);                                  // Call the function createIcon and pass through itemJacketMen in place of where clothing is
  }
  else if (clothingArray[i] === "Umbrella") {
      createIcon(itemUmbrella);                                   // Call the function createIcon and pass through itemUmbrella in place of where clothing is
  }
  else if (clothingArray[i] === "Rain Boots") {
      createIcon(itemRainBoots);                                  // Call the function createIcon and pass through itemRainBoots in place of where clothing is
  }
  else if (clothingArray[i] === "Women's Winter Coat") {
      createIcon(itemWinterCoatWomen);                            // Call the function createIcon and pass through itemWinterCoatWomen in place of where clothing is
  }
  else if (clothingArray[i] === "Men's Winter Jacket") {
      createIcon(itemWinterJacketMen);                            // Call the function createIcon and pass through itemWinterJacketMen in place of where clothing is
  }
  else if (clothingArray[i] === "Thermal Underwear Top") {
      createIcon(itemThermalUnderwearTop);                        // Call the function createIcon and pass through itemThermalUnderwearTop in place of where clothing is
  }
  else if (clothingArray[i] === "Thermal Underwear Bottom") {
      createIcon(itemThermalUnderwearBottom);                     // Call the function createIcon and pass through itemThermalUnderwearBottom in place of where clothing is
  }
  else if (clothingArray[i] === "Scarf") {
      createIcon(itemScarf);                                      // Call the function createIcon and pass through itemScarf in place of where clothing is
  }
  else if (clothingArray[i] === "Gloves") {
      createIcon(itemGloves);                                     // Call the function createIcon and pass through itemGloves in place of where clothing is
  }
  else if (clothingArray[i] === "Winter Hat") {
      createIcon(itemWinterHat);                                  // Call the function createIcon and pass through itemWinterHat in place of where clothing is
  }
  else if (clothingArray[i] === "Snow Boots") {
      createIcon(itemSnowBoots);                                  // Call the function createIcon and pass through itemSnowBoots in place of where clothing is
  }

}}


// --------------------------------------------------------------------------------
// CALL FUNCTION SHOPPING

function shopping() {

  var searchKeyword = this.getAttribute("data-clothingkeyword");  // here "this" refers to "clothingIcon"       
                                                                      
  console.log(searchKeyword);

  window.open(`https://www.amazon.com/s?k=${searchKeyword}`);   // remember to change "" to `` and then use ${} and insert var searchKeyword in between

};