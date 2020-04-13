const express = require("express");
const router = new express.Router();

const chat_app_url = process.env.CHAT_APP_URL;

router.get("/about", (req, res) => {
  res.render("about", { title: "About", chat_app_url, name: "n2sj" });
});

module.exports = router;
