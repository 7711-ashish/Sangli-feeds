
var express = require('express');
var app = express();
var PORT = 3000;
var router = express.Router();
const dbconn = require("./db/conn")
const User = require("./db/User")
 
app.use(express.json());
app.use(router)
app.use('/api/meto_hourly', require("./routers/meto"))
app.use('/api/userReg',require("./routers/userReg"))
app.use('/api/weather',require("./routers/weather"))
app.use('/api/airquality',require("./routers/airQuality"))
app.use('/api/soilinfo',require("./routers/soilInfo"))
app.use('/api/cropprod',require("./routers/cropProd"))
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});