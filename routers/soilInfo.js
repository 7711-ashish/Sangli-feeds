
var express = require('express');
var router = express.Router();
const User = require("../db/User")
const http = require("https");
const axios = require('axios');

router.get("/",async (req,res)=>{

    const options = {
        "method": "GET",
        "hostname": "api.ambeedata.com",
        "port": null,
        "path": "/soil/latest/by-lat-lng?lat=16.8524&lng=74.5815",
        "headers": {
            "x-api-key": "30896cf5c49bbad6194082cc75b4413edce0e7d39eaa67d19879ab15aadf24a4",
            "Content-type": "application/json"
        }
    };

    const reqs = http.request(options, function (resp) {
        const chunks = [];

        resp.on("data", function (chunk) {
            chunks.push(chunk);
        });

        resp.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            res.send(body)
        });
    });

    reqs.end();


})



router.get("/meteo-soil", async (req, res)=>{

    http.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm&timezone=IST', function(resp){
        let data = '';
        resp.on("data", function(chunk){
            data+= chunk;
        })
        resp.on("end", function(){
            const result = JSON.parse(data);
            res.send(data);
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })

})


module.exports = router