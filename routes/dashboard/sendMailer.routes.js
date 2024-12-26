const express = require("express");
const { sendMailToResetPass, sendTrackingNumberNotification } = require("../../controllers/sendMailer.controller");


const router = express.Router();


router.post("/sendMailToResetPass/", sendMailToResetPass)

router.post("/sendTrackingNumberNotification/", sendTrackingNumberNotification)



module.exports = router;