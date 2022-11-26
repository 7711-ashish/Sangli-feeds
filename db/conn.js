const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Kajal:majha@cluster0.pt1jg.mongodb.net/userdb?retryWrites=true&w=majority", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})