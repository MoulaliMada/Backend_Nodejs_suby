const venderController = require("../controllers/vendorController");
const express = require("express");
const router = express.Router();

router.post("/register", venderController.vendorRegister);
router.post("/login", venderController.vendorLogin);
router.get("/all-vendors", venderController.getAllVendors);
router.get("/single-vendor/:id", venderController.getVendorById);
module.exports = router;
