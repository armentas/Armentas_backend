const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertOrderModel = (data) => {
    return db.query(`
    INSERT INTO orders 
        (site_name, site_order_id, buyer, contact, sku, order_date, order_total, proportional, quantity, price, title, shipping_status, street_1, shipping_city, shipping_postal_code, shipping_state_province, shipping_country, shipping_target_name, shipping_target_phone, tracking_number, carrier, service_code, payment_id, payment_type, payment_date, promotional_code)
    VALUES 
        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            data.site_name,
            data.site_order_id,
            data.buyer,
            data.contact,
            data.sku,
            data.order_date,
            data.order_total,
            data.proportional,
            data.quantity,
            data.price,
            data.title,
            data.shipping_status,
            data.street_1,
            data.shipping_city,
            data.shipping_postal_code,
            data.shipping_state_province,
            data.shipping_country,
            data.shipping_target_name,
            data.shipping_target_phone,
            data.tracking_number,
            data.carrier,
            data.service_code,
            data.payment_id,
            data.payment_type,
            data.payment_date,
            data.promotional_code
        ]);
}

const getOrderBySiteOrderIdAndSku = (site_order_id, sku) => {
    return db.query('SELECT * FROM orders WHERE site_order_id = ? AND sku = ?',[site_order_id, sku])
}



module.exports = {
    insertOrderModel,
    getOrderBySiteOrderIdAndSku
}