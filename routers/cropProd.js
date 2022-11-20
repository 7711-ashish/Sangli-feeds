
var express = require('express');
var router = express.Router();
const User = require("../db/User")
const https = require("https");
const axios = require('axios');

router.get("/",async (req,res)=>{

    https.get('https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de?api-key=579b464db66ec23bdd00000134ddb29e41ac4f0468c02e898f4de67d&format=json&limit=20&filters[state_name]=Maharashtra&filters[district_name]=SANGLI&filters[crop_year]=2005', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            let result = JSON.parse(data)
            console.log(result.records.state)
            res.send(data)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
 
})

module.exports = router