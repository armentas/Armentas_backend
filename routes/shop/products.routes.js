const express = require("express");
const { getAllFullProducts } = require("../../controllers/products.controllers");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllFullProduct/", getAllFullProducts);

module.exports = router;