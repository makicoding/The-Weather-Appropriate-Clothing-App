//Dark Sky API key: b9dc6901023a8337df6a5c58be197ba0
//Google Maps API Key: AIzaSyBrwwwbvDLEEipFn_nr9sUtcVWqRugE2OA

var destination;
var units;
var travelDate;
var weatherArray = [];

var datePicker = function() {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left",
      timeZone: "utc"
    },
    function(start, end, label) {
      var dateArray = [];
      while (start <= end) {
        dateArray.push(moment(start).unix());
        start = moment(start).add(1, "days");
      }
      travelDate = dateArray;
    }
  );
};

var userInput = function() {
  var userName = $("#inputName").val();
  var userGender = $("#inputGender").val();
  destination = $("#inputLocation").val();
  units = $("#inputUnits").val();
};

var setWeather = function() {
  var proxy = "https://cors-anywhere.herokuapp.com/";
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=AIzaSyBQl-QMKAwNvWndyQcRfqlz39Ke6xZcb5w`,
    method: "Get"
  }).then(function(results) {
    console.log(results);
    var coordinates = results.results[0].geometry.location;
    var formDestination = results.results[0].formatted_address;
    $(
      `<div id="outputLocation">Expected temperature range in ${formDestination} is going to be: <div>`
    ).appendTo("#weatherInfoDiv");

    for (i = 0; i < travelDate.length; i++) {
      console.log(travelDate[i]);
      $.ajax({
        url: `${proxy}https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/${
          coordinates.lat
        },${coordinates.lng},${travelDate[i]}?units=${units}`,
        headers: { "Access-Control-Allow-Origin": "*" },
        method: "GET"
      }).then(function(results) {
        var weatherData = results.daily.data[0];
        var unitsSign;

        if (units === "us") {
          unitsSign = "°F";
        } else unitsSign = "°C";

        var weatherDay = moment
          .unix(results.currently.time)
          .format("MM/DD/YYYY");

        var object = {
          date: weatherDay,
          tempHi: weatherData.temperatureHigh,
          tempLo: weatherData.temperatureLow,
          summary: weatherData.summary
        };

        weatherArray.push(object);
      });
    }
  });
};

var populateWeatherDate = function() {
  weatherArray.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  for (i = 0; i < weatherArray.length; i++) {
    $(`<br>
    <div id="outputDate">Date: ${weatherArray[i].date}</div>
    <div id="outputTempHi">Temperature High: ${weatherArray[i].tempHi}</div>
    <div id="outputTempLo">Temperature Low: ${weatherArray[i].tempLo}</div>
    <div id="outputSummary"> ${weatherArray[i].summary}</div>
    <br>
    
    `).appendTo("#weatherInfoDiv");
  }
};

var handleSubmit = function() {
  $("#inputDiv").hide();
  userInput();
  setWeather();
  setTimeout(function(){ populateWeatherDate()}, 500);
};

$(document).ready(function() {
  datePicker();
  $("#buttonSubmit").click(handleSubmit);
});