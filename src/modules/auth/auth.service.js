const User = require('../user/user.model');
const issueJWT = require("./../../middleware/issueJWT")
const {genPassword, validPassword} = require('./../../utils/pass.util')

async function Register(req, res, next) {
    try {
        // get pass from body and hash with genPassword function
        const saltHash = genPassword(req.body.password);
        // make new user object with hashed pass
        const newUser = await User.create({
            username: req.body.username,
            hashPass: saltHash.hash,
            salt: saltHash.salt
        }).then((user) => {
                // if user saved, create it's token and return it.
                const jwt = issueJWT(user);

                res.json({ success: true, user: user, token: jwt.token , expiresIn: jwt.expiresIn });
            });
    } catch (error) {
        next(error)
    }
}

async function Login(req, res, next) {
    try {
        // this one with a little bit different structure
        const user = await User.findOne({username: req.body.username});
        
        if(!user) {
          return res.json({
            message: "user not found"
          })
        } 
        const validPass = validPassword(req.body.password, user.hashPass, user.salt);

        if(!validPass) {
            return res.status(401).json({message: "username or password is wrong"});
        } 

        const tokenObject = issueJWT(user);

        res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expiresIn});

    } catch (error) {
        next(error)
    }
}

module.exports = {
    Register,
    Login
}