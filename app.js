// requirements here
const express = require("express");
const { config } = require("dotenv");
const passport = require("passport");
const passportInit = require("./src/config/passport.init");
const mainRouter = require("./src/routes/index.routes");
config();

//main function running app
async function main() {
    const app = express();
    require("./src/config/db.config");
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    passportInit(passport);
    app.use(passport.initialize());
    
    app.use(mainRouter);

    app.listen(process.env.PORT, () => {
        console.log(`server is running on http://localhost:${process.env.PORT}`)
    })
}

main();