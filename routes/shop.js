const path = require("path");
const { body } = require("express-validator");

const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/item", shopController.getProduct);

router.post("/search", [body("payload").trim()], shopController.postSearch);

router.get("/aboutUs", shopController.getAboutUs);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/checkout", shopController.getCheckout);

router.get("/checkout/success", shopController.getCheckoutSuccess);

router.get("/checkout/cancel", shopController.getCheckout);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/wishlist", shopController.getWishlist);

module.exports = router;
