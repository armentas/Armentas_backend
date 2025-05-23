const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getFullProduct, getAllFullProducts } = require("../../controllers/products.controller");
const { checkToken } = require("../../middlewares/checkToken");
const { checkPermission } = require("../../middlewares/checkPermission");

const router = express.Router();

/*---------------------- Products Endpoints -------------------------------------------------*/

router.post("/addProduct", checkToken, checkPermission('Create'), addProduct);

router.put("/updateProduct/:id", checkToken, checkPermission('Update'), updateProduct);

router.delete("/deleteProduct/:id", checkToken, checkPermission('Delete'), deleteProduct);

router.get("/getProduct/:id", getProduct);

router.get("/getAllProducts", getAllProducts);

//---------------------------------------------------------

router.get("/getFullProduct/:id", getFullProduct);

router.get("/getAllFullProduct/", getAllFullProducts);

module.exports = router;