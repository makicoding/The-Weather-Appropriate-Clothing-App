//Dark Sky API key: b9dc6901023a8337df6a5c58be197ba0


var travelDate = "2020.07.01" //had coded date, to be updated once date picker is implemented.
var unixTravelDate = moment(travelDate, 'YYYY.MM.DD').unix();

var destination; //currently hard coded to NYC. destination identifier to be implemented next. Work In Progress.

$.ajax({
    url: `https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/40.735180,-73.975550,${unixTravelDate}`,
    method: "GET"
  }).then(function(results) {
      console.log($(results))
      var weatherData = results.daily.data[0];
      $(
        `<div>High temperature: ${weatherData.temperatureHigh} °F </div>
        <div>Low Temperature: ${weatherData.temperatureLow} °F </div>`
      ).appendTo("#weather")

  });