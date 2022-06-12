// Get Element References 
const formEl = $("#zip");

var searchBtn = $(".btn");
var searchInput = "";
var todayWeathericon = $(".weather-icon");


const todayTemp = $("#today-temp");
const todayWind = $("#today-wind");
const todayHumidity = $("#today-humidity");
const todayUVIndex = $("#uv-index");

var currentDate = moment().format("M/D/YYYY");
var cityName = "";
var dailyDivs = [$("#day1"), $("#day2"), $("#day3"), $("#day-4"), $("#day-5")];

const day1Temp = $("#day1 p:nth-of-type(2)");
const day1Wind = $("#day1 p:nth-of-type(3)");
const day1Humidity = $("#day1 p:nth-of-type(4)");
const day2Temp = $("#day2 p:nth-of-type(2)");
const day2Wind = $("#day2 p:nth-of-type(3)");
const day2Humidity = $("#day2 p:nth-of-type(4)");
const day3Temp = $("#day3 p:nth-of-type(2)");
const day3Wind = $("#day3 p:nth-of-type(3)");
const day3Humidity = $("#day3 p:nth-of-type(4)");
const day4Temp = $("#day4 p:nth-of-type(2)");
const day4Wind = $("#day4 p:nth-of-type(3)");
const day4Humidity = $("#day4 p:nth-of-type(4)");
const day5Temp = $("#day5 p:nth-of-type(2)");
const day5Wind = $("#day5 p:nth-of-type(3)");
const day5Humidity = $("#day5 p:nth-of-type(4)");

var weatherApiRootUrl = 'https://api.openweathermap.org';
var apiKey = 'd899707429dae12637678613a5874634';

searchBtn.click(function(){
    searchInput = $("#search-city").val().trim();
    getUserlocation(searchInput);


});

function getUserlocation(searchInput){
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var locationLat = data[0].lat;
                var locationLon = data[0].lon;
                cityName = data[0].name;
                var latString =locationLat.toString();
                var lonString =locationLon.toString();
                getWeather(latString,lonString)

            });
        }
        else{
            alert("location not found!")
        }
    }).catch(function(error){
        alert("unable to get weather");
    });

};

function getWeather(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.okay){
            response.json().then(function(data){
                var currentCityname = $(".sub-title");
                currentCityname.text(cityName.toUpperCase() + " (" + currentDate + ") " );
                var currentWeathericonEl = $("#current-icon");
                currentWeathericonEl.attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
                var currentTempEl = $("#today-temp");
                currentTempEl.text(data.current.temp);
                var currentWindEl = $("#today-wind");
                currentWindEl.text(data.current.wind_speed);
                var currentHumidityEl = $("#today-humidity");
                currentHumidityEl.text(data.current.humidity);
                var currentUvEl = $("#uv-index");
                currentUvEl.text(data.current.uvi);



            }

            )}
    })



    //API call here
}



