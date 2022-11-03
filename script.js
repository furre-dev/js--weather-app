const cardContainer = document.querySelector(".card-container");

const card = document.querySelector(".card");

const cityName = document.querySelector(".city-name");
const tempInCelsius = document.querySelector(".temp-in-c");
const weatherDescription = document.querySelector(".weather-description");
const cardImage = document.querySelector(".card-image");

const cityInput = document.querySelector(".city-input");

let cities_json_url = "./cities.json"

//makes the first card always be stockholm!
getWeatherData(card, 59.329, 18.068)

function lowercase(text) {
    if (text.indexOf(" ") > 1) {
        let indexOfSpace = text.indexOf(" ");
        let firstCapital = text.charAt(0).toUpperCase();
        let lowerText = text.slice(1, indexOfSpace + 1).toLowerCase();
        let firstCapitalAfterSpace = text.charAt(indexOfSpace + 1).toUpperCase();
        let remainingText = text.slice(indexOfSpace + 2).toLowerCase();

        console.log(indexOfSpace)

        string = firstCapital + lowerText + firstCapitalAfterSpace + remainingText;
        return string;
    } else {
        let firstCapital = text.charAt(0).toUpperCase();
        let lowerText = text.slice(1).toLowerCase();

        string = firstCapital + lowerText;
        return string;
    }
}

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        returnLat(lowercase(cityInput.value));
    }
});

async function returnLat(city_name) {
    const response = await fetch(cities_json_url);
    const data = await response.json();

    const allCards = document.querySelectorAll(".cards");
    console.log(allCards.length);

    let lat = 0;
    let long = 0;

    data.city.forEach(element => {
        if (element.name == city_name) {
            lat = element.lat;
            long = element.long;

            const clone = card.cloneNode(true);
            cardContainer.appendChild(clone);

            getWeatherData(clone, lat, long);
        }

    })
};












async function getWeatherData(element, lat, long) {

    let weather_api_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=f58ad5e3a5e3480869752e3d146475aa";

    const response = await fetch(weather_api_url);
    const data = await response.json();


    const iconCode = data.weather[0].icon;

    //H3 city name
    element.children[0].textContent = data.name;;
    //Temp
    element.children[1].textContent = Math.floor(data.main.temp) + "°C";;
    //Image
    element.children[2].src = "http://openweathermap.org/img/wn/" + iconCode + "@4x.png";;
    //Description
    element.children[3].textContent = data.weather[0].description;

}
