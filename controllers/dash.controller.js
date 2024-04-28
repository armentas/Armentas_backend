const { getAllOrdersModel, getAllOrdersYearModel, getAllOrdersByDateModel, getAllOrdersMonthModel, getlatestProductsAddedModel } = require("../models/dash.model");


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

module.exports = {
    getAllOrders,
    getAllOrdersYear,
    getAllOrdersMonth,
    getAllOrdersByDate,

    getLatestProductsAdded
};