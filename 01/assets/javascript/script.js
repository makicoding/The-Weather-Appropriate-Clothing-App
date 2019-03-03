//Dark Sky API key: b9dc6901023a8337df6a5c58be197ba0
//Google Maps API Key: AIzaSyBrwwwbvDLEEipFn_nr9sUtcVWqRugE2OA




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
  var userName = $("#inputName").val();
  var userGender = $("#inputGender").val();
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
      url: `${proxy}https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/${coordinates.lat},${coordinates.lng},${travelDate[i]}?units=${units}`,
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





var populateWeatherDate = function (x) {
  console.log(x);
  x.forEach((element) => {
    $(`<br>
    <div id="outputDate">Date: ${element.date}</div>
    <div id="outputTempHi">Temperature High: ${element.tempHi}</div>
    <div id="outputTempLo">Temperature Low: ${element.tempLo}</div>
    <div id="outputSummary"> ${element.summary}</div>
    <div id="icon">${element.icon}</div>
    <br>
    `).appendTo("#weatherInfoDiv");
  });
}

var handleSubmit = async function () {
  userInput();
  var weeatherArray = await setWeather();
  populateWeatherDate(weeatherArray);

}


$(document).ready(function () {
  datePicker();
  $('#buttonSubmit').click(handleSubmit);
});

