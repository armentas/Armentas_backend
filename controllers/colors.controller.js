const { insertColorModel, deleteColorModel, getAllColorsModel, getColorModel, updateColorModel } = require("../models/colors.model");


const addColor = async (req, res) => {
    try {
        const [data] = await insertColorModel(req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateColor = async (req, res) => {
    try {
        const [data] = await updateColorModel(req.params.id, req.body);
        res.send({
            data
        });

    } catch (error) {       
        res.status(500).json({
            msg: error.message,
        });
    }
}


const deleteColor = async (req, res) => {
    try {
        const [data] = await deleteColorModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getColor = async (req, res) => {
    try {
        const [data] = await getColorModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllColors = async (req, res) => {
    try {
        const [data] = await getAllColorsModel();
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
    addColor,
    updateColor,
    deleteColor,
    getColor,
    getAllColors
};