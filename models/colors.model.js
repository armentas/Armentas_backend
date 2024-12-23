const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertColorModel = ({ name, color_key, hexCode }) => {
    return db.query(
        "INSERT INTO colors (name, color_key, hexCode) VALUES (?, ?, ?)", 
        [name, color_key, hexCode]
    );
};

const updateColorModel = (id, data) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE colors SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
};

const deleteColorModel = (id) => {
    return db.query("DELETE FROM colors WHERE id = ?", [id]);
};

const getColorModel = (id) => {
    return db.query("SELECT * FROM colors WHERE id = ?", [id]);
};

const getAllColorsModel = () => {
    return db.query("SELECT * FROM colors");
};

module.exports = {
    insertColorModel,
    updateColorModel,
    deleteColorModel,
    getColorModel,
    getAllColorsModel
}