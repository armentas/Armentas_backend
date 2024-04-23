const express = require("express");
const { createCheckoutSession, sessionStatus, createPaymentIntent, cancelPaymentIntent, updatePaymentIntentShipping } = require("../../controllers/payment.controllers");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/checkout/", createCheckoutSession);

router.post("/payment-intent/", createPaymentIntent);

router.get("/cancel-payment-intent/:paymentIntentId", cancelPaymentIntent);

router.post("/update-payment-intent-shipping/:paymentIntentId", updatePaymentIntentShipping);

router.get("/session-status/", sessionStatus);

module.exports = router;