const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { addImageUrl, addImageFile, updateImage, deleteImage, getImage, getAllImages, getImageByProductId } = require("../../controllers/images.controllers");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/


router.post("/addImageUrl/:id", addImageUrl);

router.post("/addImageFile/:id", upload.single('image'), addImageFile);

router.put("/updateImage/:id", updateImage);

router.delete("/deleteImage/:id", deleteImage);

router.get("/getImage/:id", getImage);

router.get("/getImageByProductId/:id", getImageByProductId);

router.get("/getAllImages", getAllImages);

// ---------------------------------------------

module.exports = router;