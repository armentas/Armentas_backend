const express = require("express");
const { addImage, updateImage, deleteImage, getImage, getAllImages, addLinkImage, deleteLinkImage } = require("../../controllers/images.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/


router.post("/addImage", addImage);

router.put("/updateImage/:id", updateImage);

router.delete("/deleteImage/:id", deleteImage);

router.get("/getImage/:id", getImage);

router.get("/getAllImages", getAllImages);

// ---------------------------------------------

router.post("/addLinkImage", addLinkImage);

router.delete("/deleteLinkImage/:id", deleteLinkImage);

module.exports = router;