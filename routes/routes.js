const express = require("express");
const router = express.Router();
var VerifyToken = require("../common/VerifyToken");

const product_controller = require("../api/controllers/product.controller");
const auth_controller = require("../api/controllers/auth.controller");

router.post("/product/create", VerifyToken, product_controller.product_create);
router.post("/product/update", VerifyToken, product_controller.product_update);
router.get("/products", VerifyToken, product_controller.all_my_products);
router.get("/product/:id", product_controller.product_details);

router.post("/register", auth_controller.user_create);
router.get("/verify-email", auth_controller.verify_email);
router.post("/login", auth_controller.user_login);
router.get("/me", VerifyToken, auth_controller.me);
router.post("/reset-password-request", auth_controller.reset_password_request);
router.post("/reset-password", auth_controller.reset_password);

module.exports = router;
