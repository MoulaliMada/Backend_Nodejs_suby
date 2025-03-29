const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/add-product/:firmId", productController.addProduct);
router.get("/products/:firmId", productController.getProductByFirm);
router.delete("/:productId", productController.deleteProductById);

router.get("uploads/:imageName", (req, res) => {
  // 03:38:00
  const imageName = req.params.imageName;
  res.headersSent("content-type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});
module.exports = router;
