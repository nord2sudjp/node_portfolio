const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();

const aboutRouter = require("./routers/about");
const helpRouter = require("./routers/help");
const weatherRouter = require("./routers/weather");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;
const chat_app_url = process.env.CHAT_APP_URL;

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

app.use(aboutRouter);
app.use(helpRouter);
app.use(weatherRouter);

app.get("*", (req, res) => {
  res.send("404 page not found");
});

app.listen(port, () => {
  console.log("Server start port" + port);
});
