const express = require("express");
const { getAllCategories } = require("../../controllers/categories.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllCategories", getAllCategories);


module.exports = router;