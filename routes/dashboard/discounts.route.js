const express = require("express");
const { addDiscount, updateDiscount, deleteDiscount, getDiscount, getAllDiscounts } = require("../../controllers/discounts.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/addDiscount", addDiscount);

router.put("/updateDiscount/:id", updateDiscount);

router.delete("/deleteDiscount/:id", deleteDiscount);

router.get("/getDiscount/:id", getDiscount);

router.get("/getAllDiscounts", getAllDiscounts);

module.exports = router;