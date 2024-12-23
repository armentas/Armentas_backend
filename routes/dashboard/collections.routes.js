const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { checkToken } = require("../../middlewares/checkToken");
const { checkPermission } = require("../../middlewares/checkPermission");
const { addCollection, updateCollection, deleteCollection, getCollection, getAllCollections, addImageFile } = require("../../controllers/collections.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/addCollection", checkToken, checkPermission('Create'), addCollection);

router.put("/updateCollection/:id", checkToken, checkPermission('Update'), updateCollection);

router.delete("/deleteCollection/:id", checkToken, checkPermission('Delete'), deleteCollection);

router.get("/getCollection/:id", getCollection);

router.get("/getAllCollections", getAllCollections);

/*------------------------------------------------------------------------------------------ */

router.post("/addImageFile/", checkToken, checkPermission('Create'), upload.single('image'), addImageFile);

module.exports = router;