
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
   
    
});

app.post("/", function(req,res) {
    
    const query = req.body.cityName;
    const apikey= "0739163c786bedf444d5253d199d9a77";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=0739163c786bedf444d5253d199d9a77&units=metric";


    https.get(url, function(response){
    

    response.on("data", function(data) {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const wind = weatherData.wind.speed;

        res.write("<h1>the temp in "+query+ " is " + temp + "</h1>");
        res.write("speed is " + wind);
        res.send();
    });
});
    
});

app.listen(3000, function() {
    console.log("running on 3000");
});
