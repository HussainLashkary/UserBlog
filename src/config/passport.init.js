const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const User = require("../modules/user/user.model");

const pathToKey = path.join(__dirname, '../..', 'id_rsa_pub.pem');
const pubKey = fs.readFileSync(pathToKey, "utf8");
console.log(pathToKey)
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: pubKey,
    algorithms: ["RS256"]
}

const strategy = new jwtStrategy(options, async (payload, done) => {
    await User.findOne({_id: payload.sub})
        .then((user) => {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null));
});

function passportInit(passport) {
    passport.use(strategy);
}

module.exports = passportInit;
