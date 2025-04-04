const { Router } = require("express");
const {authRoutes} = require("../modules/auth/auth.routes");
const passport = require("passport");
const {blogRoutes} = require("../modules/blog/blog.routes");

const mainRouter = Router();

mainRouter.use('/auth', authRoutes);

mainRouter.use('/blog', blogRoutes);

mainRouter.post('/test', passport.authenticate("jwt", {session: false}), (req, res, next) => {
    res.status(200).json({
        msg: "you are authorized"
    })
});

module.exports = mainRouter;