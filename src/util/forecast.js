const request = require("request");
// const rsc = require("../dev_rsc/rsc.js");

const forecast = (city, callback) => {
  url =
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ja&units=metric&appid=` +
    process.env.WEATHER_API_KEY;
  console.log(url);
  request({ url: url }, (error, response) => {
    if (error) {
      console.log(error);
      callback(error, undefined);
    } else {
      data = JSON.parse(response.body);
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
