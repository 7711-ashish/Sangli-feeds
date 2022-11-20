
var express = require('express');
var router = express.Router();
const User = require("../db/User")
const http = require("https");
const axios = require('axios');

router.get("/",async (req,res)=>{

    // const url = 'https://checkip.amazonaws.com/';
    // const response = await axios(url);
    // console.log(`My public IP address is: ${response.data.trim()}`);

    // const options = {
    //     "method": "GET",
    //     "hostname": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    //     "port": null,
    //     "path": `/json/?ip=${response.data.trim()}`,
    //     "headers": {
    //         "X-RapidAPI-Key": "dd630f4467msh0ae381f87c496a9p14e904jsn3b6dda866b7d",
    //         "X-RapidAPI-Host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    //         "useQueryString": true
    //     }
    // };
    
    // const reqs = http.request(options, function (resp) {
    //     const chunks = [];
    
    //     resp.on("data", function (chunk) {
    //         chunks.push(chunk);
    //     });
    
    //     resp.on("end", function () {
    //         const body = Buffer.concat(chunks);
    //         console.log(body.toString());
    //         res.send(body);
    //     });
    // });
    
    // reqs.end();



    const options = {
        "method": "GET",
        "hostname": "weatherapi-com.p.rapidapi.com",
        "port": null,
        "path": "/current.json?q=17.036800%2C74.605000",
        "headers": {
            "X-RapidAPI-Key": "dd630f4467msh0ae381f87c496a9p14e904jsn3b6dda866b7d",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
            "useQueryString": true
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



module.exports = router