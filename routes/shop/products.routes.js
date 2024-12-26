const express = require("express");
const { getAllFullProducts, updateProduct, getProductbySKU } = require("../../controllers/products.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllFullProduct/", getAllFullProducts);

router.get("/getProductbySKU/:sku", getProductbySKU);

router.put("/updateProduct/:id", updateProduct);



module.exports = router;