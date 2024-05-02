const express = require("express");
const { getAllOrders, getAllOrdersYear, getAllOrdersByDate, getAllOrdersMonth, getLatestProductsAdded, updateStatus, getImageUrlFromSku, getAllOrdersPreviousMonth } = require("../../controllers/dash.controller");
const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllOrders", getAllOrders);

router.get("/getAllOrdersYear", getAllOrdersYear);

router.get("/getAllOrdersMonth", getAllOrdersMonth);

router.get("/getAllOrdersPreviousMonth", getAllOrdersPreviousMonth);

router.post("/getAllOrdersByDate", getAllOrdersByDate);

router.get("/latestProductsAdded", getLatestProductsAdded);

router.put("/updateStatus/:site_order_id", updateStatus);

router.get("/getImageUrlFromSku/:sku", getImageUrlFromSku);


module.exports = router;