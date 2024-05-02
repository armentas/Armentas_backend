const db = require('../configs/db.config').promise();

const getAllOrdersModel = () => {
    return db.query("SELECT * FROM orders");
}

const getAllOrdersYearModel = () => {
    return db.query("SELECT * FROM orders WHERE YEAR(order_date) = YEAR(CURDATE())");
}

const getAllOrdersMonthModel = () => {
    return db.query("SELECT * FROM orders WHERE YEAR(order_date) = YEAR(CURDATE()) AND MONTH(order_date) = MONTH(CURDATE())");
}

const getAllOrdersPreviousMonthModel = () => {
    return db.query(`
    SELECT * 
    FROM orders 
    WHERE 
        (
            YEAR(order_date) = YEAR(CURDATE()) AND 
            MONTH(order_date) = MONTH(CURDATE()) - 1 AND 
            DAY(order_date) BETWEEN 1 AND DAY(CURDATE())
        )
        OR
        (
            MONTH(order_date) = 12 AND 
            YEAR(order_date) = YEAR(CURDATE()) - 1 AND 
            MONTH(CURDATE()) = 1 AND 
            DAY(order_date) BETWEEN 1 AND DAY(CURDATE())
        );`);
}

const getAllOrdersByDateModel = (start_date, end_date) => {
    const start_datetime = start_date + " 00:00:00";
    const end_datetime = end_date + " 23:59:59";

    return db.query("SELECT * FROM orders WHERE order_date BETWEEN ? AND ?", 
    [start_datetime, end_datetime]);
}

const getlatestProductsAddedModel = () => {
    return db.query("SELECT * FROM products WHERE created_date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY) AND created_date <= NOW()");
}

const updateStatusModel = (site_order_id, data) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE orders SET ${fieldsToUpdate} WHERE site_order_id = ?`, 
    [...Object.values(data), site_order_id]);
}

const getImageUrlFromSkuModel = (sku) => {
    return db.query("SELECT im.img_url FROM images im JOIN products pr ON im.id_product = pr.id WHERE pr.sku = ? limit 1;", [sku]);
}

module.exports = {
    getAllOrdersModel,
    getAllOrdersYearModel,
    getAllOrdersMonthModel,
    getAllOrdersPreviousMonthModel,
    getAllOrdersByDateModel,

    getlatestProductsAddedModel,
    updateStatusModel,
    getImageUrlFromSkuModel
}