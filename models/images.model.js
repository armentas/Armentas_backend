const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertImageModel = ({img_url}) => {
    return db.query("INSERT INTO images (img_url) VALUES (?)", 
    [img_url]); 
}

const updateImageModel = (id, {img_url}) => {
    return db.query("UPDATE images SET img_url = ? WHERE id = ?", 
    [img_url, id]);
}

const deleteImageModel = (id) => {
    return db.query("DELETE FROM images WHERE id = ?", 
    [id]);
}

const getImageModel = (id) => {
    return db.query("SELECT * FROM images WHERE id = ?", 
    [id]);
}

const getAllImageModel = () => {
    return db.query("SELECT * FROM images");
}

//---------------------------------------------------

const insertLinkImageModel = ({products_id, images_id}) => {
    return db.query("INSERT INTO products_has_images (products_id, images_id) VALUES (?,?)", 
    [products_id, images_id]); 
}

const deleteLinkImageModel = (id) => {
    return db.query("DELETE FROM products_has_images WHERE id = ?", 
    [id]);
}

module.exports = {
    insertImageModel,
    updateImageModel,
    deleteImageModel,
    getImageModel,
    getAllImageModel,

    insertLinkImageModel,
    deleteLinkImageModel
}