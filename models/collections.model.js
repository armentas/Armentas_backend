const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertCollectionModel = ({ name, code, title, description, image, active }) => {
    return db.query(
        "INSERT INTO collections (name, code, title, description, image, active) VALUES (?, ?, ?, ?, ?, ?)", 
        [name, code, title, description, image, active]
    );
};

const updateCollectionModel = (id, data) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE collections SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
};

const deleteCollectionModel = (id) => {
    return db.query("DELETE FROM collections WHERE id = ?", [id]);
};

const getCollectionModel = (id) => {
    return db.query("SELECT * FROM collections WHERE id = ?", [id]);
};

const getAllCollectionsModel = () => {
    return db.query("SELECT * FROM collections");
};

module.exports = {
    insertCollectionModel,
    updateCollectionModel,
    deleteCollectionModel,
    getCollectionModel,
    getAllCollectionsModel
}