const express = require("express")
const path = require("path")
const app = express();

app.listen(8080, () => {
    console.log("listening 8080 port")
})

app.use(express.static(path.resolve(__dirname, "../assets")));

// app.use(express.static(path.join(__dirname, "/assets")))
// app.use("../assets", express.static("assets"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../view/login.html"));
})