const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getFullProduct, getAllFullProducts } = require("../../controllers/products.controllers");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/addProduct", addProduct);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

router.get("/getProduct/:id", getProduct);

router.get("/getAllProducts", getAllProducts);

//---------------------------------------------------------

router.get("/getFullProduct/:id", getFullProduct);

router.get("/getAllFullProduct/", getAllFullProducts);

module.exports = router;