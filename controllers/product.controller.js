const Product = require("../models/product.model");

exports.product_create = function(req, res, next) {
  if (req.body.name && req.body.price) {
    let product = new Product({
      name: req.body.name,
      price: req.body.price
    });
    //use schema.create to insert data into the db
    product.save(function(err, product) {
      if (err) {
        return next(err);
      } else {
        res.status(200).send({ product: product });
      }
    });
  } else {
    res.status(500).send("Invalid Information");
  }
};

exports.product_details = function(req, res, next) {
  if (req.params.id) {
    Product.findById(req.params.id, function(err, product) {
      if (err) {
        return next(err);
      } else {
        res.status(200).send({ product: product });
      }
    });
  } else {
    res.status(500).send("Invalid Information");
  }
};

exports.all_products = function(req, res, next) {
  Product.find({}, function(err, product) {
    if (err) {
      return next(err);
    } else {
      res.status(200).send({ product: product });
    }
  });
};
