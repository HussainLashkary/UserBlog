const express = require("express");
const { config } = require("dotenv");
const passport = require("passport");
config();

async function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    passportInit(passport);
    app.use(passport.initialize());
    require("./src/config/db.config");
    app.listen(process.env.PORT, () => {
        console.log(`server is running on http://localhost:${process.env.PORT}`)
    })
}

main();