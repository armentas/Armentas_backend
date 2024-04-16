const express = require("express");
const { getAllFullProducts } = require("../../controllers/products.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllFullProduct/", getAllFullProducts);

module.exports = router;