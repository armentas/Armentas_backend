const express = require("express");
const { checkToken } = require("../../middlewares/checkToken");
const { checkPermission } = require("../../middlewares/checkPermission");
const { addCategory, updateCategory, deleteCategory, getCategory, getAllCategories } = require("../../controllers/categories.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/addCategory", checkToken, checkPermission('Create'), addCategory);

router.put("/updateCategory/:id", checkToken, checkPermission('Update'), updateCategory);

router.delete("/deleteCategory/:id", checkToken, checkPermission('Delete'), deleteCategory);

router.get("/getCategory/:id", getCategory);

router.get("/getAllCategories", getAllCategories);

/*------------------------------------------------------------------------------------------ */

module.exports = router;