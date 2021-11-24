const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("express-session");
const userData = require("./user-map.json");
const app = express();
require("dotenv").config();

const userMap = Object.keys(userData).map((idx) => userData[idx]);

app.listen(process.env.PORT, () => {
  console.log(`listening ${process.env.PORT} port`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 700000,
      isLogin: false,
    },
  })
);

app.use(express.static(path.resolve(__dirname, "../assets")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "/assets")))
// app.use("../assets", express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../view/home.html"));
});

app.get("/join", (req, res) => {
  console.log("join!!!!!!!!!!!!!!!!");
  res.sendFile(path.resolve(__dirname, "../view/join.html"));
});
app.post("/join", (req, res) => {
  userData.push(req.body);
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../view/login.html"));
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;

  console.log(userData);

  req.session.cookie.login = id;
  res.redirect("http://localhost:8080/");
});
