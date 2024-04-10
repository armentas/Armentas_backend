const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertProductModel = ({type, title, description, sku, price, category, sale, tag}) => {
    return db.query("INSERT INTO products (type, title, description, sku, price, category, sale, tag) VALUES (?,?,?,?,?,?,?,?)", 
    [type, title, description, sku, price, category, sale, tag]); 
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

const getAllProductsModel = () => {
    return db.query("SELECT * FROM products");
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
    getAllProductsModel,
    getAllImagesByProductID
}