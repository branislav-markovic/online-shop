const authJwt  = require("../middlewares/shop.middleware");
const controller = require("../controllers/product.controller");

module.exports = (app) => {
    app.get('/shop/product', [authJwt.verifyToken], controller.getAllProducts);

    app.get('/shop/orders', [authJwt.verifyToken], controller.getUserOrders);

    app.get('/shop/allOrders', [authJwt.verifyToken], controller.getAllOrders);

    app.post('/shop/orders', [authJwt.verifyToken], controller.saveOrder);

    app.post('/shop/updateOrdersComment', [authJwt.verifyToken], controller.updateOrdersComment);

    app.patch('/shop/orders/:id', [authJwt.verifyToken], controller.cancelOrder);
}
