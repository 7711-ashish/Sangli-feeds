var express = require('express');
var router = express.Router();
const User = require("../db/User")

router.post('/login', async (req, res) =>{
    try{
        const data = await req.body;
        const user = await User.findOne({ username: data["username"] });

        const pass = data["password"]
        const reqPass = user["password"]

        if(pass != reqPass){
            res.send({success,data:"Password doesn't Match!!"})
        }
        success = true
        res.send({success,data:user})
    }
    catch(e){
        console.log(e)
        res.send({success,data:e})
    }
    

})

router.post('/signup', async (req, res)=> {
    let success = false
    try{
        const data = await req.body;
        const savedData = await User.create(data)
        await savedData.save()
        success = true
        res.send({success,data:data});
    }
    catch(e){
        console.log(e)
        res.send({success,data:e})
    }
    
})

module.exports = router