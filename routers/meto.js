
var express = require('express');
var router = express.Router();
const User = require("../db/User")
const https = require("https");
const axios = require('axios');

router.get("/soil",async (req,res)=>{

    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=soil_temperature_0cm&timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
 
})


router.get("/current",async (req,res)=>{

    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&current_weather=true&timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data))
            const result = JSON.parse(data);
            res.send(result.current_weather);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
})


router.get("/hourly-forecast",async (req,res)=>{

    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,cloudcover,weathercode&timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data))
            const result = JSON.parse(data);
            res.send(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
})



router.get("/relativehumidity_2m",async (req,res)=>{
    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=relativehumidity_2m/timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            res.send(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
 
})

router.get("/dewpoint_2m",async (req,res)=>{
    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=dewpoint_2m/timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    }) 
})

router.get("/apparent_temperature",async (req,res)=>{
    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=apparent_temperature&timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            let result = JSON.parse(data)
            let r =0;
            for(var i=0; i<24; i++){
                r += result.hourly.apparent_temperature[i];

            }
            console.log(r/24)
            res.send(result.hourly.apparent_temperature);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
 
})



router.get("/rain",async (req,res)=>{

    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=rain/timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
 
})


router.post(`/history/:start/:end`,async (req,res)=>{
    let st = req.params.start;
    let en = req.params.end;
    const url = 'https://archive-api.open-meteo.com/v1/era5?latitude=16.85438&longitude=74.56417&start_date='+ st +'&end_date='+ en +'&hourly=temperature_2m&timezone=IST';
    console.log(url)
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            const result = JSON.parse(data);
            res.send(result.hourly.temperature_2m);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
 
})


module.exports = router
