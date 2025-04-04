const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")

function swaggerConfig(app) {
    const swaggerDocument = swaggerJSDoc({
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "UserBlog",
                version: "1.0.0",
                description: "user authenticate and blog creation project"
            }
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"]
    });
    const swagger = swaggerUi.setup(swaggerDocument, {});
    app.use("/swagger", swaggerUi.serve, swagger);
};

module.exports = swaggerConfig