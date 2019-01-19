const express = require("express");
const router = express.Router();
var VerifyToken = require("../auth/VerifyToken");

const product_controller = require("../controllers/product.controller");
const register_controller = require("../controllers/auth.controller");

router.post("/product/create", product_controller.product_create);
router.get("/product/:id", product_controller.product_details);
router.get("/products", product_controller.all_products);

router.post("/register", register_controller.user_create);
router.post("/login", register_controller.user_login);
router.get("/me", VerifyToken, register_controller.me);

module.exports = router;
