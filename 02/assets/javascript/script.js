console.log("JavaScript connected!");

// --------------------------------------------------------------------------------
// GLOBAL VARIABLES

var userGender = ""

// ------------------------------
// Clothing items (set to false to begin with)
var wardrobe = [
  {
    item: "Summer Hat",
    image: "assets/images/icons/100px_iconSummerHatWomen.png",
    lowerBound: 68,
    upperBound: undefined,
    gender: "female",
  },
  {
    item: "Pants",
    image: "assets/images/icons/100px_iconPants.png",
    lowerBound: undefined,
    upperBound: 67,
    gender: undefined,
  },
  {
    item: "Sweater",
    image: "assets/images/icons/100px_iconSweater.png",
    lowerBound: undefined,
    upperBound: 67,
    gender: undefined,
  },

  {
    item: "Winter Hat",
    image: "assets/images/icons/100px_iconWinterHat.png",
    lowerBound: undefined,
    upperBound: 45,
    gender: undefined,
  },
  {
    item: "Gloves",
    image: "assets/images/icons/100px_iconGloves.png",
    lowerBound: undefined,
    upperBound: 45,
    gender: undefined,
  },
  {
    item: "Scarf",
    image: "assets/images/icons/100px_iconScarf.png",
    lowerBound: undefined,
    upperBound: 45,
    gender: undefined,
  },
  {
    item: "Thermal Underwear Bottom",
    image: "assets/images/icons/100px_iconThermalUnderwearBottom.png",
    lowerBound: undefined,
    upperBound: 45,
    gender: undefined,
  },
  {
    item: "Thermal Underwear Top",
    image: "assets/images/icons/100px_iconThermalUnderwearTop.png",
    lowerBound: undefined,
    upperBound: 45,
    gender: undefined,
  },
  {
    item: "Men's Winter Jacket",
    image: "assets/images/icons/100px_iconWinterJacketMen.png",
    lowerBound: undefined,
    upperBound: 45,
    gender: "male",
  },
  {
    item: "Women's Winter Coat",
    image: "assets/images/icons/100px_iconWinterCoatWomen.png",
    lowerBound: undefined,
    upperBound: 45,
    gender: "female",
  },

  {
    item: "Men's Jacket",
    image: "assets/images/icons/100px_iconJacketMen.png",
    lowerBound: 45,
    upperBound: 67,
    gender: "male",
  },
  {
    item: "Women's Jacket",
    image: "assets/images/icons/100px_iconJacketWomen.png",
    lowerBound: 45,
    upperBound: 67,
    gender: "female",
  },
  {
    item: "Shorts",
    image: "assets/images/icons/100px_iconShorts.png",
    lowerBound: 68,
    upperBound: undefined,
    gender: undefined,
  },
  {
    item: "Skirt",
    image: "assets/images/icons/100px_iconSkirt.png",
    lowerBound: 68,
    upperBound: undefined,
    gender: "female",
  },
  {
    item: "Men's Cap",
    image: "assets/images/icons/100px_iconSummerCapMen.png",
    lowerBound: 68,
    upperBound: undefined,
    gender: "male",
  },
];

// All the different clothing options available: "Sunscreen", "Sunglasses", etc. 
var accessories = [
  {
    item: "Sunscreen",
    image: "assets/images/icons/100px_iconSunscreen.png",
    condition: ["clear-day"]
  },
  {
    item: "Sunglasses",
    image: "assets/images/icons/100px_iconSunglasses.png",
    condition: ["clear-day"]
  },
  {
    item: "Rain Boots",
    image: "assets/images/icons/100px_iconRainBoots.png",
    condition: ["rain", "sleet", "hail", "thunderstorm"]

  },
  {
    item: "Umbrella",
    image: "assets/images/icons/100px_iconUmbrella.png",
    condition: ["rain", "sleet", "hail", "thunderstorm"]
  },
  {
    item: "Snow Boots",
    image: "assets/images/icons/100px_iconSnowBoots.png",
    condition: ["snow"]
  },
]

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
    opens: 'left',                              // Can change this to left, center, or right
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
  var lowestTemp = -100;
  var highestTemp = 0;
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
      url: `${proxy}https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/${coordinates.lat},${coordinates.lng},${travelDate[i]}?units=us`,   // you could also change units=${units} to use the temperature selector fahrenheit and celsius.  At the moment units=us to run the calculations in fahrenheit.  To run the calculations in celsius, units=si
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
    if (weatherData.temperatureLow > lowestTemp) {
      lowestTemp = weatherData.temperatureLow;
    }

    if (weatherData.temperatureHigh > highestTemp) {
      highestTemp = weatherData.temperatureHigh;
    }
  }
  return [weatherArray, lowestTemp, highestTemp];

}


var populateWeatherDate = function (x) {
  x.forEach((element) => {
    $(`<br>
    <div id="outputDate">Date: ${element.date}</div>
    <div id="outputTempHi">Temperature High: ${element.tempHi}</div>
    <div id="outputTempLo">Temperature Low: ${element.tempLo}</div>
    <div id="outputSummary"> ${element.summary}</div>
    <br>
    `).appendTo("#weatherInfoDiv");                           // Add <div id="icon">${element.icon}</div> just after <div id="outputSummary"> ${element.summary}</div> if wanting to display machine readable text summary
    $("#appContainer2").show();
    $("#appContainer1").hide();
    
                                      
  });
}




var handleSubmit = async function () {
  userInput();
  var weatherArray = await setWeather();
  populateWeatherDate(weatherArray[0]);
  //populateRecommendation(weatherArray)
  getRecommendation(weatherArray[1], weatherArray[2])
  getAccessories(weatherArray[0])

}


$(document).ready(function () {
  datePicker();
  $('#buttonSubmit').click(handleSubmit);
  $("#appContainer1").show();
  $("#appContainer2").hide();
});


// --------------------------------------------------------------------------------

//Populate recommendations:

var insertClotingDOM = function(x){
  $(`<div id = "clotingIcon" class="iconDiv" data-clotingkeyword="${x.item}">
  <img src="${x.image}" class="iconImage">
  <div class="iconText">${x.item}</div>`).appendTo("#iconsAppearHereDiv");
  document.getElementById("clotingIcon").addEventListener("click", shopping);

}

//Populate recommendations based on temperature

var getRecommendation = function (lowTemperature, highTemperature) {

  wardrobe.forEach(element => {
    if ((!element.gender) || (userGender === element.gender)) {
      if (!element.lowerBound) {
        if (!element.upperBound || element.upperBound >= lowTemperature) {
          insertClotingDOM(element);
        }
      } else {
        if (element.lowerBound <= highTemperature && (!element.upperBound || element.upperBound >= lowTemperature)) {
          insertClotingDOM(element);
        }
      }
    }
  });
}

//Populate recommendations based on weather icons/conditions such as snow, rain, etc. and not temperature.

var getAccessories = function (array){
  var weatherIcons = [];
  array.forEach(element =>{
  weatherIcons.push(element.icon)
  })
  var weatherIconsUnique = weatherIcons.filter(function(item, index){
    return weatherIcons.indexOf(item) >= index;
  });

  weatherIconsUnique.forEach(condition=>{
    accessories.forEach(accessory =>{
      accessory.condition.forEach(state=>{
        if(condition === state){
          insertClotingDOM(accessory);
        }
      })
      
    })
  })
}



// --------------------------------------------------------------------------------
// CALL FUNCTION SHOPPING

function shopping() {

  var searchKeyword = this.getAttribute("data-clothingkeyword");  // here "this" refers to "clothingIcon"       
                                                                      
  console.log(searchKeyword);

  window.open(`https://www.amazon.com/s?k=${searchKeyword}`);     // remember to change "" to `` and then use ${} and insert var searchKeyword in between

};


// --------------------------------------------------------------------------------
// RESET BUTTONS

var resetButton1 = document.getElementById("buttonReset1"); 
resetButton1.addEventListener("click", appReset);                 // When the user clicks id="buttonsReset1", the function appReset is called

var resetButton2 = document.getElementById("buttonReset2"); 
resetButton2.addEventListener("click", appReset);                 // When the user clicks id="buttonsReset2", the function appReset is called


function appReset() {
  location.reload();                                              // Reloads entire webpage
}