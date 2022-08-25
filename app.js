const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "22b5709fb430498519c2c08594e1f9d1";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units;
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const description = weatherData.weather[0].description
      const temp = weatherData.main.temp;
      const icon_url = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";


      res.write("<p>The weather in " + query + " is " + description + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>");
      res.write("<img src=" + icon_url + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
