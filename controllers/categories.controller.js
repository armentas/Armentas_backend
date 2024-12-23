const { insertCategoryModel, updateCategoryModel, deleteCategoryModel, getCategoryModel, getAllCategoriesModel } = require("../models/categories.model");

const addCategory = async (req, res) => {
    try {
        const [data] = await insertCategoryModel(req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateCategory = async (req, res) => {
    try {
        const [data] = await updateCategoryModel(req.params.id, req.body);
        res.send({
            data
        });

    } catch (error) {              
        res.status(500).json({
            msg: error.message,
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const [data] = await deleteCategoryModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getCategory = async (req, res) => {
    try {
        const [data] = await getCategoryModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const [data] = await getAllCategoriesModel();
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
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories
};