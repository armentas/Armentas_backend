const express = require("express");
const { createCheckoutSession, sessionStatus } = require("../../controllers/payment.controllers");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/checkout/", createCheckoutSession);

router.get("/session-status/", sessionStatus);

module.exports = router;