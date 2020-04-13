//const e = require("express");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const txtMessage1 = document.querySelector("#message1");
const txtMessage2 = document.querySelector("#message2");

const txtCity = document.querySelector("#city");
const txtMap = document.querySelector("#map");

const txtForecast = document.querySelector("#forecast");

clearView = () => {
  txtMessage1.textContent = "";
  txtMessage2.textContent = "";
  txtCity.textContent = "";
  txtForecast.innerHTML = "";
  txtMap.textContent = "";
  txtMap.setAttribute("href", "");
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  txtMessage1.textContent = "Loading...";
  txtMessage2.textContent = "";

  fetch("/weather/search/?address=" + location).then((response) => {
    response.json().then((data) => {
      clearView();
      if (data.error) {
        console.log(data.error);
        txtMessage1.textContent = data.error;
        txtCity.textContent = data.forecast.name;
      } else {
        cityname = data.forecast.name;
        console.log(cityname);
        console.log(JSON.stringify(data.forecast));

        if (!cityname) {
          txtMessage1.innerHTML = `${data.forecast.cod} - ${data.forecast.message}`;
          return;
        }

        txtCity.textContent = data.forecast.name;
        txtForecast.innerHTML = `現在の天気は : ${data.forecast.weather[0].description}<br>
               <img src="http://openweathermap.org/img/w/${data.forecast.weather[0].icon}.png"><br>
               最高気温 / 最低気温 : ${data.forecast.main.temp_max} / ${data.forecast.main.temp_min}<br>
               湿度 : ${data.forecast.main.humidity}%<br>`;
        //JSON.stringify(data.forecast.weather[0]);

        txtMap.setAttribute(
          "href",
          `https://google.com/maps/?q=${data.forecast.coord.lat},${data.forecast.coord.lon}`
        );
        txtMap.textContent = "Location";
      }
    });
  });
});
