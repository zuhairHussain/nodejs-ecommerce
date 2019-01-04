const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');
const register_controller = require('../controllers/register.controller');

router.post('/create', product_controller.product_create);
router.get('/:id', product_controller.product_details);

router.post('/register', register_controller.user_create);

module.exports = router;