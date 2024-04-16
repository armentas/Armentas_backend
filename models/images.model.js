const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertImageModel = ({id_product, img_key, img_url}) => {
    return db.query("INSERT INTO images (id_product, img_key, img_url) VALUES (?,?,?)", 
    [id_product, img_key, img_url]); 
}

const updateImageModel = (id, data) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE images SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
}

const deleteImageModel = (id) => {
    return db.query("DELETE FROM images WHERE id = ?", 
    [id]);
}

const deleteImageByProductIdModel = (id_product) => {
    return db.query("DELETE FROM images WHERE id_product = ?", 
    [id_product]);
}

const getImageModel = (id) => {
    return db.query("SELECT * FROM images WHERE id = ?", 
    [id]);
}

const getImageByProductIdModel = (id_product) => {
    return db.query("SELECT * FROM images WHERE id_product = ?", 
    [id_product]);
}

const getAllImageModel = () => {
    return db.query("SELECT * FROM images");
}

//---------------------------------------------------

module.exports = {
    insertImageModel,
    updateImageModel,
    deleteImageModel,
    deleteImageByProductIdModel,
    getImageModel,
    getAllImageModel,
    getImageByProductIdModel
}