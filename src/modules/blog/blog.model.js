const { Schema, model } = require("mongoose");

const BlogModel = new Schema({
    userId: {type: String, required: true},
    title: {type: String, require: true, maxLength: 100},
    description: {type: String, required: true}
});

const Blog = model("blog", BlogModel);

module.exports = {
    Blog
}