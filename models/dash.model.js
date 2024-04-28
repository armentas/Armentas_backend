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

const getAllOrdersByDateModel = (start_date, end_date) => {
    const start_datetime = start_date + " 00:00:00";
    const end_datetime = end_date + " 23:59:59";

    return db.query("SELECT * FROM orders WHERE order_date BETWEEN ? AND ?", 
    [start_datetime, end_datetime]);
}

const getlatestProductsAddedModel = () => {
    return db.query("SELECT * FROM products WHERE created_date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY) AND created_date <= NOW()");
}

module.exports = {
    getAllOrdersModel,
    getAllOrdersYearModel,
    getAllOrdersMonthModel,
    getAllOrdersByDateModel,

    getlatestProductsAddedModel
}