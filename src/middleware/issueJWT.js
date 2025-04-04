const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "./../../", "id_rsa_pub.pem")
const pub_key = fs.readFileSync(pathToKey)
function issueJWT(user) {
    const _id = user._id;
    const expiresIn = "7d";

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jwt.sign(payload, pub_key, {expiresIn: expiresIn, algorithm: 'RS256'});

    return {
        token: "Bearer" + ' ' + signedToken,
        expiresIn: expiresIn
    }
}

module.exports = issueJWT;