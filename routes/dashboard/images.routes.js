const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { addImageUrl, addImageFile, updateImage, deleteImage, getImage, getAllImages, getImageByProductId } = require("../../controllers/images.controller");
const { checkToken } = require("../../middlewares/checkToken");
const { checkPermission } = require("../../middlewares/checkPermission");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/


router.post("/addImageUrl/:id", checkToken, checkPermission('Create'), addImageUrl);

router.post("/addImageFile/:id", checkToken, checkPermission('Create'), upload.single('image'), addImageFile);

router.put("/updateImage/:id", checkToken, checkPermission('Update'), updateImage);

router.delete("/deleteImage/:id", checkToken, checkPermission('Delete'), deleteImage);

router.get("/getImage/:id", getImage);

router.get("/getImageByProductId/:id", getImageByProductId);

router.get("/getAllImages", getAllImages);

// ---------------------------------------------

module.exports = router;