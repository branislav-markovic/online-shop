const authJwt  = require("../middlewares/shop.middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
    app.put('/users/:id', [authJwt.verifyToken], controller.updateUser);
}
