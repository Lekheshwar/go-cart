const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser } = require("../middlerwares/auth");

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/products/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);
router.route("/admin/product/new").post(newProduct);
module.exports = router;
