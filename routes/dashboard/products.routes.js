const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getFullProduct, getAllFullProducts } = require("../../controllers/products.controllers");
const { checkToken } = require("../../Middlewares/checkToken");
const { checkPermission } = require("../../Middlewares/checkPermission");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/addProduct", checkToken, checkPermission('Create'), addProduct);

router.put("/updateProduct/:id", checkToken, checkPermission('Update'), updateProduct);

router.delete("/deleteProduct/:id", checkToken, checkPermission('Delete'), deleteProduct);

router.get("/getProduct/:id", getProduct);

router.get("/getAllProducts", getAllProducts);

//---------------------------------------------------------

router.get("/getFullProduct/:id", getFullProduct);

router.get("/getAllFullProduct/", getAllFullProducts);

module.exports = router;