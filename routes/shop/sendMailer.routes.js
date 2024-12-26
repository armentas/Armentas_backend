const express = require("express");
const { sendMailorderConfirmation, sendNewMessageNotification } = require("../../controllers/sendMailer.controller");


const router = express.Router();


router.post("/sendMailorderConfirmation/", sendMailorderConfirmation)

router.post("/sendNewMessageNotification/", sendNewMessageNotification)



module.exports = router;