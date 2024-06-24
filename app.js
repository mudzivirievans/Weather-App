const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");  
});
app.post("/", function(req, res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "5b96741e80d9c0aabe1b3e28e9c08aaf";
    const units = "metric";
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units=" + units + "");


    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){

            const weatherData = JSON.parse(data)

            const temp = weatherData.main.temp 
            const weatherDes = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p> The weather is currently " + weatherDes + "<p>");
            res.write("<h1>The temparature in " + query +" is " + temp + " degrees Celcius</h1>");
            res.write ("<img src= " + imageUrl +" >");

        res.send();

        })
    });


});

app.listen(3000, function (){
    console.log("Server is running on port 3000.")
});

