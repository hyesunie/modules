const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
require("dotenv").config();
const UserInfo = require("./user-info");

const userInfo = new UserInfo();

app.listen(process.env.PORT, () => {
  console.log(`listening ${process.env.PORT} port`);
});

app.use(express.static(path.resolve(__dirname, "../assets")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 700000,
    },
    isLogin: false,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../view/home.html"));
});

app.get("/join", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../view/join.html"));
});

app.post("/join", (req, res) => {
  userInfo.addUserMap(req.body);
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../view/login.html"));
});

app.post("/login", (req, res) => {
  const existUser = userInfo.checkUserInfo(req.body);
  if (existUser) {
    req.session.isLogin = true;
    res.redirect("http://localhost:8080/");
  } else {
    res.send("not exist ID,PASSWORD");
  }
});
