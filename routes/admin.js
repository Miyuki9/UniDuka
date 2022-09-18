const path = require("path");
const { body } = require("express-validator");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isLength({ min: 3 }).isString().trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
    body("inventory").isInt(),
    body("color").isLength({ min: 3 }).isString().trim(),
  ],
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isLength({ min: 3 }).isString().trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
    body("inventory").isInt(),
    body("color").isLength({ min: 3 }).isString().trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
