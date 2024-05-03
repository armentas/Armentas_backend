const express = require("express");
const { getAllOrders, getAllOrdersYear, getAllOrdersByDate, getAllOrdersMonth, getLatestProductsAdded, updateStatus, getImageUrlFromSku, getAllOrdersPreviousMonth } = require("../../controllers/dash.controller");
const { checkToken } = require("../../Middlewares/checkToken");
const { checkPermission } = require("../../Middlewares/checkPermission");
const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllOrders", getAllOrders);

router.get("/getAllOrdersYear", getAllOrdersYear);

router.get("/getAllOrdersMonth", getAllOrdersMonth);

router.get("/getAllOrdersPreviousMonth", getAllOrdersPreviousMonth);

router.post("/getAllOrdersByDate", getAllOrdersByDate);

router.get("/latestProductsAdded", getLatestProductsAdded);

router.put("/updateStatus/:site_order_id", checkToken, checkPermission('Update'), updateStatus);

router.get("/getImageUrlFromSku/:sku", getImageUrlFromSku);


module.exports = router;