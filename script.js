const temp = document.getElementById("temp"),
    date = document.getElementById("date-time"),
    currentLocation = document.getElementById("location"),
    condition = document.getElementById("condition"),
    rain = document.getElementById("rain"),
    mainIcon = document.getElementById("icon"),
    uvIndex = document.querySelector("uv-index"),
    uvText = document.querySelector("uv-index"),
    windSpeed = document.querySelector("uv-index"),
    sunRise = document.querySelector("uv-index"),
    sunSet = document.querySelector("uv-index"),
    humidity = document.querySelector("uv-index"),
    visibility = document.querySelector("uv-index"),
    humidityStatus = document.querySelector("uv-index"),
    airQuality = document.querySelector("uv-index"),
    airQualityStatus = document.querySelector("uv-index"),
    visibilityStatus = document.querySelector("uv-index");




let currentCity ="";
let currentUnit ="c";
let hourlyOrWeek ="Week";

//update date and time
function getDateTime(){
    let now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes();

    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    hour = hour % 12;
    if (hour < 10){
        hour = "0" + hour;
        }
    if (minute < 10){
        minute = "0" + minute;
        }

    let dayString = days[now.getDay()];
    return`${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();
//update time every second
setInterval(() => {
    date.innerText = getDateTime();
}, 1000);

//function to get public ip with fetch

function getPublicIp(){
    fetch("http://geolocation-db.com/json/",{
        method: "GET",
    }).then((response) => response.json())
      .then((data) => {
            console.log(data);
            // currentCity = data.currentCity;
            getWeatherData(data.city, currentUnit, hourlyOrWeek);
        });
}
getPublicIp();
//function to get weather data
function getWeatherData (city, unit, hourOrWeek){
    const apiKey = "Z5RPE2NEKUZCG8QEY3PUFFA6U"
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
        {
            method: "GET",
        }
        )
        .then((response) => response.json())
        .then((data) => {
            let today = data.currentConditions;
            if (unit === "c"){
                temp.innerText = today.temp;
            }else {
                temp.innerText = celciusToFahrenheit(today.temp);
            }
            currentLocation.innerText = data.resolvedAddress;
            condition.innerText = today.conditions;
            rain.innerText = "Perc - " + today.precip + "%";
        });
}

//convert celcius to fahrenheit
function celciusToFahrenheit(temp){

    return ((temp * 9) / 5 + 32).toFixed(1);
}