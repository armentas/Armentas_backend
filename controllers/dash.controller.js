const { getAllOrdersModel, getAllOrdersYearModel, getAllOrdersByDateModel, getAllOrdersMonthModel, getlatestProductsAddedModel, updateStatusModel, getImageUrlFromSkuModel, getAllOrdersPreviousMonthModel } = require("../models/dash.model");


const getAllOrders = async (req, res) => {
    try {
        const [data] = await getAllOrdersModel();
        res.send({
            amount: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllOrdersYear = async (req, res) => {
    try {
        const [data] = await getAllOrdersYearModel();
        res.send({
            amount: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllOrdersMonth = async (req, res) => {
    try {
        const [data] = await getAllOrdersMonthModel();
        res.send({
            amount: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllOrdersPreviousMonth = async (req, res) => {
    try {
        const [data] = await getAllOrdersPreviousMonthModel();
        res.send({
            amount: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllOrdersByDate = async (req, res) => {
    try {
        const { start_date, end_date } = req.body;
        const [data] = await getAllOrdersByDateModel(start_date, end_date);
        res.send({
            amount: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getLatestProductsAdded = async (req, res) => {
    try {
        const [data] = await getlatestProductsAddedModel();
        res.send({
            amount: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { site_order_id } = req.params;       

        const [data] = await updateStatusModel(site_order_id, req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImageUrlFromSku = async (req, res) => {
    try {
        const { sku } = req.params;

        const [data] = await getImageUrlFromSkuModel(sku);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

module.exports = {
    getAllOrders,
    getAllOrdersYear,
    getAllOrdersMonth,
    getAllOrdersPreviousMonth,
    getAllOrdersByDate,

    getLatestProductsAdded,
    updateStatus,
    getImageUrlFromSku
};