const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertCategoryModel = ({ name, code }) => {
    return db.query(
        "INSERT INTO categories (name, code) VALUES (?, ?)", 
        [name, code]
    );
};

const updateCategoryModel = (id, data) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE categories SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
};

const deleteCategoryModel = (id) => {
    return db.query("DELETE FROM categories WHERE id = ?", [id]);
};

const getCategoryModel = (id) => {
    return db.query("SELECT * FROM categories WHERE id = ?", [id]);
};

const getAllCategoriesModel = () => {
    return db.query("SELECT * FROM categories");
};

module.exports = {
    insertCategoryModel,
    updateCategoryModel,
    deleteCategoryModel,
    getCategoryModel,
    getAllCategoriesModel
}