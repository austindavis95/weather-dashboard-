// Get Element References 
const formEl = $("#zip");

var searchBtn = $("#search-city + .btn");
var searchInput = "";
var todayWeathericon = $(".weather-icon");


const todayTemp = $("#today-temp");
const todayWind = $("#today-wind");
const todayHumidity = $("#today-humidity");
const todayUVIndex = $("#uv-index");

var currentDate = moment().format("M/D/YYYY");
var cityName = "";
var cityHistory = [];

var weatherApiRootUrl = 'https://api.openweathermap.org';
var apiKey = '49878545401425eaac21a85870c31217';

$("#search-city").keyup( function(e) {
    if (e.key === 'Enter') {
        searchInput = $("#search-city").val().trim();
        getUserLocation(searchInput);
    }
});

searchBtn.click( function() {
    searchInput = $("#search-city").val().trim();
    getUserLocation(searchInput);
});

$(".city-history").click( function() {
    getUserLocation($(this).attr("data-value"));
});

function getUserLocation(searchInput) {
    var apiUrl = weatherApiRootUrl + "/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                var locationLat = data[0].lat;
                var locationLon = data[0].lon;
                cityName = data[0].name;
                var latString =locationLat.toString();
                var lonString =locationLon.toString();
                getWeather(latString,lonString);
                getFiveDayForecast(latString,lonString);
                addCityHistory(data[0].name)

            });
        }
        else {
            alert("Location not found!")
        }
    }).catch(function(error){
        alert("Unable to get weather.");
    });
};

function getWeather(lat,lon) {
    var apiUrl = weatherApiRootUrl + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                $(".sub-title").text(cityName.toUpperCase() + " (" + currentDate + ") " );
                $("#current-icon").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
                $("#today-temp").text(data.current.temp);
                $("#today-wind").text(data.current.wind_speed);
                $("#today-humidity").text(data.current.humidity);
                $("#uv-index").text(data.current.uvi);
                if (data.current.uvi < 2) {
                    $("#uv-index").attr("class", "green");
                }
                else if (data.current.uvi < 4) {
                    $("#uv-index").attr("class", "yellow");
                }
                else if (data.current.uvi < 6) {
                    $("#uv-index").attr("class", "orange");
                }
                else {
                    $("#uv-index").attr("class", "red");
                }
            })
        }
    });
}

function getFiveDayForecast(lat,lon) {
    var apiUrl = weatherApiRootUrl + "/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                $("#day1 .date").html(moment().add(1, 'days').format("M/D/YYYY"));
                $("#day2 .date").html(moment().add(2, 'days').format("M/D/YYYY"));
                $("#day3 .date").html(moment().add(3, 'days').format("M/D/YYYY"));
                $("#day4 .date").html(moment().add(4, 'days').format("M/D/YYYY"));
                $("#day5 .date").html(moment().add(5, 'days').format("M/D/YYYY"));

                $("#day1 p:nth-of-type(1)").html("<img src='https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png'/>");
                $("#day1 p:nth-of-type(2)").html("Temp: " + data.list[0].main.temp + "&deg;F");
                $("#day1 p:nth-of-type(3)").html("Wind: " + data.list[0].wind.speed + "mph");
                $("#day1 p:nth-of-type(4)").html("Humidity: " + data.list[0].main.humidity + "%");
                $("#day2 p:nth-of-type(1)").html("<img src='https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png'/>");
                $("#day2 p:nth-of-type(2)").html("Temp: " + data.list[1].main.temp + "&deg;F");
                $("#day2 p:nth-of-type(3)").html("Wind: " + data.list[1].wind.speed + "mph");
                $("#day2 p:nth-of-type(4)").html("Humidity: " + data.list[1].main.humidity + "%");
                $("#day3 p:nth-of-type(1)").html("<img src='https://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png'/>");
                $("#day3 p:nth-of-type(2)").html("Temp: " + data.list[2].main.temp + "&deg;F");
                $("#day3 p:nth-of-type(3)").html("Wind: " + data.list[2].wind.speed + "mph");
                $("#day3 p:nth-of-type(4)").html("Humidity: " + data.list[2].main.humidity + "%");
                $("#day4 p:nth-of-type(1)").html("<img src='https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png'/>");
                $("#day4 p:nth-of-type(2)").html("Temp: " + data.list[3].main.temp + "&deg;F");
                $("#day4 p:nth-of-type(3)").html("Wind: " + data.list[3].wind.speed + "mph");
                $("#day4 p:nth-of-type(4)").html("Humidity: " + data.list[3].main.humidity + "%");
                $("#day5 p:nth-of-type(1)").html("<img src='https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png'/>");
                $("#day5 p:nth-of-type(2)").html("Temp: " + data.list[4].main.temp + "&deg;F");
                $("#day5 p:nth-of-type(3)").html("Wind: " + data.list[4].wind.speed + "mph");
                $("#day5 p:nth-of-type(4)").html("Humidity: " + data.list[4].main.humidity + "%");
            })
        }
    });
}

function addCityHistory(location) {
    if (!cityHistory.includes(location)) {
        var html = "<button class='btn d-block city-history' data-value='" + location + "'>" + location + "</button>";
        $("#cities").append(html);
        cityHistory.push(location);

        $(".city-history").click( function() {
            getUserLocation($(this).attr("data-value"));
        });
    }
}