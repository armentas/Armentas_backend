const express = require("express");
const { getCollection, getAllCollections } = require("../../controllers/collections.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/


router.get("/getCollection/:id", getCollection);

router.get("/getAllCollections", getAllCollections);


module.exports = router;