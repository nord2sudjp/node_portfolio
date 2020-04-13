const express = require("express");
const router = new express.Router();
const forecast = require("../util/forecast.js");

const chat_app_url = process.env.CHAT_APP_URL;

router.get("/weather/index", (req, res) => {
  res.render("weather_index", {
    title: "Weather Search",
    chat_app_url,
    name: "n2sj",
  });
});

router.get("/weather/search", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  forecast(req.query.address, (error, forecastData = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    //console.log("Data", data);
    res.send({ forecast: forecastData, originaladdress: req.query.address });
  });
  //   res.send({
  //     forecast: "It it snowing",
  //     location: "Tokyo",
  //     address: req.query.address,
  //   });
});

module.exports = router;
