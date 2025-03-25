const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/selfProject").then(() => {
    console.log("connect to mongodb")
}).catch(err => {
    console.log(`${err} connect to mongodb failed`)
});
