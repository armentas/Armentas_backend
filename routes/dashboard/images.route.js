const express = require("express");
const { addImage, updateImage, deleteImage, getImage, getAllImages, addLinkImage, deleteLinkImage, getImageByProductId } = require("../../controllers/images.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/


router.post("/addImage", addImage);

router.put("/updateImage/:id", updateImage);

router.delete("/deleteImage/:id", deleteImage);

router.get("/getImage/:id", getImage);

router.get("/getImageByProductId/:id", getImageByProductId);

router.get("/getAllImages", getAllImages);

// ---------------------------------------------

module.exports = router;