const stripe = require('stripe')('sk_test_IKYCHOAmUhC7IPTdaoVtO58D');

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

module.exports = {
    createCheckoutSession,
    sessionStatus
}