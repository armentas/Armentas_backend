const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertProductModel = ({collection, title, description, sku, price, stock, weight, category, colors, sale, tags}) => {
    return db.query("INSERT INTO products (collection, title, description, sku, price, stock, weight, category, colors, sale, tags) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
    [collection, title, description, sku, price, stock, weight, category, colors, sale, tags]); 
}

const updateProductModel = (id, data) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE products SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
}

const deleteProductModel = (id) => {
    return db.query("DELETE FROM products WHERE id = ?", 
    [id]);
}

const getProductModel = (id) => {
    return db.query("SELECT * FROM products WHERE id = ?", 
    [id]);
}

const getProductbySKUModel = (sku) => {
    return db.query("SELECT * FROM products WHERE sku = ? LIMIT 1", 
    [sku]);
}

const getAllProductsModel = () => {
    return db.query("SELECT * FROM products ORDER BY created_date DESC");
}

//--------------------------------------------------------

const getAllImagesByProductID = (products_id) => {
    return db.query("SELECT * FROM images WHERE id_product = ?", [products_id]);
}

module.exports = {
    insertProductModel,
    updateProductModel,
    deleteProductModel,
    getProductModel,
    getProductbySKUModel,
    getAllProductsModel,
    getAllImagesByProductID
}