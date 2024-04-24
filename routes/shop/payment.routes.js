const express = require("express");
const { createCheckoutSession, createPaymentIntent, cancelPaymentIntent, updatePaymentIntentShipping, getPaymentMethod, saveOrder } = require("../../controllers/payment.controllers");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/checkout/", createCheckoutSession);

router.post("/payment-intent/", createPaymentIntent);

router.get("/cancel-payment-intent/:paymentIntentId", cancelPaymentIntent);

router.post("/update-payment-intent-shipping/:paymentIntentId", updatePaymentIntentShipping);

router.get("/get-payment-method/:paymentMethodId", getPaymentMethod);

//---------------------------------------------------------------------------------------------------

router.post("/save-order/", saveOrder);

module.exports = router;