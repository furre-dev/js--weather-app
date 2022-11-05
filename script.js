const cardContainer = document.querySelector(".card-container");

const card = document.querySelector(".card");

const cityName = document.querySelector(".city-name");
const tempInCelsius = document.querySelector(".temp-in-c");
const weatherDescription = document.querySelector(".weather-description");
const cardImage = document.querySelector(".card-image");

const cityInput = document.querySelector(".city-input");

let cities_json_url = "./cities.json";

//makes the first card always be stockholm!
getWeatherData(card, "Stockholm", 59.329, 18.068);






function lowercase(text) {
  if (text.indexOf(" ") > 1) {
    let indexOfSpace = text.indexOf(" ");
    let firstCapital = text.charAt(0).toUpperCase();
    let lowerText = text.slice(1, indexOfSpace + 1).toLowerCase();
    let firstCapitalAfterSpace = text.charAt(indexOfSpace + 1).toUpperCase();
    let remainingText = text.slice(indexOfSpace + 2).toLowerCase();


    string = firstCapital + lowerText + firstCapitalAfterSpace + remainingText;
    console.log(string)
    return string;
  } else {
    let firstCapital = text.charAt(0).toUpperCase();
    let lowerText = text.slice(1).toLowerCase();

    string = firstCapital + lowerText;
    console.log(string)
    return string;
  }

}

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    returnLat(lowercase(cityInput.value));
  }
});

async function returnLat(user_input) {
  const geocode_url = `http://api.openweathermap.org/geo/1.0/direct?q=${user_input}&&appid=${"f58ad5e3a5e3480869752e3d146475aa"}`;
  const response = await fetch(geocode_url);
  const data = await response.json();

  const allCards = document.querySelectorAll(".cards");


  let cityExists = false;
  allCards.forEach((e) => {
    if (e.children[0].innerHTML == user_input) {
      console.log(e.children[0].innerHTML)
      cityExists = true;
    }
  });
  console.log("city exists =" + cityExists)
  if (cityExists === true) {

    return null;
  }
  console.log("city exists =" + cityExists)

  let lat = 0;
  let long = 0;


  data.forEach((element) => {
    if (element.name == user_input) {
      lat = element.lat;
      long = element.lon;

      const cityName = element.name;


      const clone = card.cloneNode(true);
      cardContainer.appendChild(clone);

      getWeatherData(clone, cityName, lat, long);
    }
  });
}

async function getWeatherData(element, city_name, lat, long) {
  let weather_api_url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=f58ad5e3a5e3480869752e3d146475aa`;
  const response = await fetch(weather_api_url);
  const data = await response.json();

  const iconCode = data.weather[0].icon;


  //H3 city name
  element.children[0].textContent = city_name;
  //Temp
  element.children[1].textContent = Math.round(data.main.temp) + "°C";
  //Image
  element.children[2].src =
    "http://openweathermap.org/img/wn/" + iconCode + "@4x.png";
  //Description
  element.children[3].textContent = data.weather[0].description;
}
