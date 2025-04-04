const { Router } = require("express");
const passport = require("passport");
const { createBlog, getUserBlogs, deleteBlog } = require("./blog.service");
const router = Router();

router.post('/create', passport.authenticate("jwt", {session: false}), createBlog);
router.get('/getBlogs', passport.authenticate("jwt", {session: false}), getUserBlogs);
router.delete('/deleteBlog', passport.authenticate("jwt", {session: false}), deleteBlog);



module.exports = {
    blogRoutes: router
}