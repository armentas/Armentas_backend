const express = require("express");
const { getAllOrders, getAllOrdersYear, getAllOrdersByDate, getAllOrdersMonth, latestProductsAdded, getLatestProductsAdded } = require("../../controllers/dash.controller");
const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllOrders", getAllOrders);

router.get("/getAllOrdersYear", getAllOrdersYear);

router.get("/getAllOrdersMonth", getAllOrdersMonth);

router.post("/getAllOrdersByDate", getAllOrdersByDate);

router.get("/latestProductsAdded", getLatestProductsAdded)


module.exports = router;