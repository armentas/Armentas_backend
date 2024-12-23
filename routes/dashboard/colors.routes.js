const express = require("express");
const { checkToken } = require("../../middlewares/checkToken");
const { checkPermission } = require("../../middlewares/checkPermission");
const { getColor, getAllColors, addColor, deleteColor, updateColor } = require("../../controllers/colors.controller");

const router = express.Router();

/*---------------------- Colors Endpoints -------------------------------------------------*/

router.post("/addColor", checkToken, checkPermission('Create'), addColor);

router.put("/updateColor/:id", checkToken, checkPermission('Update'), updateColor);

router.delete("/deleteColor/:id", checkToken, checkPermission('Delete'), deleteColor);

router.get("/getColor/:id", getColor);

router.get("/getAllColors", getAllColors);


module.exports = router;