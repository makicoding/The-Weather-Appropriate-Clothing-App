//Dark Sky API key: b9dc6901023a8337df6a5c58be197ba0
//Google Maps API Key: AIzaSyBrwwwbvDLEEipFn_nr9sUtcVWqRugE2OA



var travelDate = "2020.01.01" //hard coded date, to be updated once date picker is implemented.
var unixTravelDate = moment(travelDate, 'YYYY.MM.DD').unix();
var destination = "london"; //hard coded destination until front end form is complete.
var coordinates
var formDestination;
var proxy = 'https://cors-anywhere.herokuapp.com/'

$.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=AIzaSyBQl-QMKAwNvWndyQcRfqlz39Ke6xZcb5w`,
    method: "Get"
}).then(function(results){
    console.log(results);
    coordinates = results.results[0].geometry.location;
    formDestination = results.results[0].formatted_address;
    


    $.ajax({
        url: `${proxy}https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/${coordinates.lat},${coordinates.lng},${unixTravelDate}`,
        headers: {'Access-Control-Allow-Origin': '*'},
        method: "GET"
      }).then(function(results) {
          console.log($(results))
          var weatherData = results.daily.data[0];
          $(
            `<div>Expected temperature range in ${formDestination} is going to be: <div>
            <div>High temperature: ${weatherData.temperatureHigh} °F </div>
            <div>Low Temperature: ${weatherData.temperatureLow} °F </div>`
          ).appendTo("#weather")
    
      });
})






