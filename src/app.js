const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const forecast = require("./util/forecast.js");

console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;
const chat_app_url = process.env.CHAT_APP_URL;
console.log(process.env.CHAT_APP_URL);

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Node Portfolio by n2sj",
    chat_app_url,
    name: "n2sj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", chat_app_url, name: "n2sj" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", chat_app_url, name: "n2sj" });
});

app.get("/weather_index", (req, res) => {
  res.render("weather_index", {
    title: "Weather Search",
    chat_app_url,
    name: "n2sj",
  });
});

app.get("/weather", (req, res) => {
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

app.get("*", (req, res) => {
  res.send("404 page not found");
});

app.listen(port, () => {
  console.log("Server start port" + port);
});
