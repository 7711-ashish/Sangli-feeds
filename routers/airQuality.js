
var express = require('express');
var router = express.Router();
const User = require("../db/User")
const https = require("https");
const axios = require('axios');

router.get("/",async (req,res)=>{

    https.get('https://api.weatherbit.io/v2.0/current/airquality?lat=16.8524&lon=74.5815&key=a769e833231549f6a940a6cc58cab42f', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            res.send(data)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
 
})

router.get("/meteo_air_quality", async(req, res)=>{


    https.get('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=16.85438&longitude=74.56417&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index,uv_index_clear_sky', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            res.send(data)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })


})




module.exports = router