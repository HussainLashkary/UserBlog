const { deleteOne } = require("../user/user.model");
const {Blog} = require("./blog.model")

async function createBlog(req, res, next) {
    try {
        const { title, description } = req.body;

        const newBlog = await Blog.create({
         userId: req.user._id,
            title,
            description
        })
    
        res.json({
         message: "Blog created successfully", newBlog
        })
    } catch (error) {
        next(error)
    }
}

async function getUserBlogs(req, res, next) {
    try {
        const userBlogs = await Blog.find({ userId: req.user._id }, {userId: 0, __v: 0});
    
        res.json({
            message: `user Blogs:` , userBlogs
        })
    } catch (error) {
        next(error)
    }
}

async function deleteBlog(req, res, next) {
    try {
        const blogId = req.query.id
        
        const blog = await Blog.findById(blogId)
        if(blog) {
            blog.deleteOne(blog).then((blog) => {
                res.json({message: "Blog deleted successfully"});
            });
        } else {
            "something went wrong"
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createBlog,
    getUserBlogs,
    deleteBlog
}