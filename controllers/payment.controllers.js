const stripe = require('stripe')(process.env.STRIPE_sk);

const createCheckoutSession = async (req, res) => {
    try {
        const items = req.body.items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        description: item.sku,
                        images: [item.images[0]?.img_url]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }
        })

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [...items],
            mode: 'payment',
            return_url: `${process.env.URL_ECOMMERCE_LOCAL}shop/checkout/success/{CHECKOUT_SESSION_ID}`,
            // cancel_url: `${process.env.URL_ECOMMERCE_LOCAL}shop/cart`,
        });

        res.send({
            session
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const createPaymentIntent = async (req, res) => {
    try {
        const { items } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items) * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
            clientId: paymentIntent.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message,
        });
    }
}

const cancelPaymentIntent = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;

        const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

        res.send({
            status: paymentIntent.status
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updatePaymentIntentShipping = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;
        const { data } = req.body;

        const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
            shipping: {
                name: data.fullname,
                phone: data.phone,
                address: {
                    city: data.city,
                    country: data.country,
                    line1: data.address,
                    postal_code: data.postalcode,
                    state: data.state
                }
            }
        });

        res.send({
            paymentIntent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message,
        });
    }
}

const sessionStatus = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

        res.send({
            status: session.status,
            customer_email: session.customer_details.email
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

// ---------------------------------------------------------------------------
const calculateOrderAmount = (items) => {
    return items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
};

module.exports = {
    createCheckoutSession,
    cancelPaymentIntent,
    updatePaymentIntentShipping,
    createPaymentIntent,
    sessionStatus
}