
var express = require('express');
var router = express.Router();
const User = require("../db/User")
const https = require("https");
const axios = require('axios');

var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        let hour = today.getHours();
        var hours = ""
        console.log(hour)
        if(hour>9)
            hours = String(hour)
        else{
            hours = '0'+String(hour)
        }     
        today = yyyy+'-'+mm+'-'+dd+'T'+hours+':00';

router.get("/soil/:lat/:longi", async (req, res) => {

    let longi = req.params.longi
    let lat = req.params.lat

    console.log(longi)
    console.log(lat)

    https.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${longi}&hourly=soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm&timezone=IST`, (resp) => {

        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            const result = JSON.parse(data);
            var index = result.hourly.time.indexOf(today)
    
            const rslt = {
                soil_temperature_0cm: result.hourly.soil_temperature_0cm[index],
                soil_temperature_6cm: result.hourly.soil_temperature_6cm[index],
                soil_temperature_18cm: result.hourly.soil_temperature_18cm[index],
                soil_temperature_54cm: result.hourly.soil_temperature_54cm[index],
            }
            res.send(rslt);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
})

router.get("/soil/moist/:lat/:longi", async (req, res) => {

    let longi = await req.params.longi
    let lat = await req.params.lat

    https.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${longi}&hourly=soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm&timezone=IST`, (resp) => {

        const d = new Date();
        let hour = d.getHours();

        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            const result = JSON.parse(data);
            var index = result.hourly.time.indexOf(today)
            const rslt = {
                soil_moisture_0_1cm: result.hourly.soil_moisture_0_1cm[index],
                soil_moisture_1_3cm: result.hourly.soil_moisture_1_3cm[index],
                soil_moisture_3_9cm: result.hourly.soil_moisture_3_9cm[index],
                soil_moisture_9_27cm: result.hourly.soil_moisture_9_27cm[index],
                soil_moisture_27_81cm: result.hourly.soil_moisture_27_81cm[index]
            }
            res.send(rslt);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
})


router.get("/current", async (req, res) => {

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


router.get("/hourly-forecast", async (req, res) => {

    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,cloudcover,weathercode&timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data))
            const result = JSON.parse(data);

            const relt = {

                temperature_2m: result.hourly.temperature_2m,
                relativehumidity: result.hourly.relativehumidity_2m,
                dewpoint: result.hourly.dewpoint_2m,
                cloudcover: result.hourly.cloudcover,
                weathercode: result.hourly.weathercode
            }
            res.send(relt);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
})



router.get("/relativehumidity_2m", async (req, res) => {
    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=relativehumidity_2m&timezone=IST', (resp) => {
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

router.get("/dewpoint_2m", async (req, res) => {
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

router.get("/apparent_temperature", async (req, res) => {
    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=apparent_temperature&timezone=IST', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            let result = JSON.parse(data)
            let r = 0;
            for (var i = 0; i < 24; i++) {
                r += result.hourly.apparent_temperature[i];
            }
            console.log(r / 24)
            res.send(result.hourly.apparent_temperature);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
})

router.get("/rain", async (req, res) => {
    https.get('https://api.open-meteo.com/v1/forecast?latitude=16.85438&longitude=74.56417&hourly=rain&timezone=IST', (resp) => {
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


router.post(`/history/:start/:end`, async (req, res) => {
    let st = req.params.start;
    let en = req.params.end;
    const url = 'https://archive-api.open-meteo.com/v1/era5?latitude=16.85438&longitude=74.56417&start_date=' + st + '&end_date=' + en + '&hourly=temperature_2m&timezone=IST';
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