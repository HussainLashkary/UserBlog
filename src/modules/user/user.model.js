const { Schema, model } = require("mongoose");

const UserModel = new Schema({
    username: {type: String, required: true},
    hashPass: {type: String, required: true},
    salt: {type: String, required: true}
});

const User = model("User", UserModel);
module.exports = User;