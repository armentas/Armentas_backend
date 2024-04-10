const { getDiscountModel } = require("../models/discounts.model");
const { insertProductModel, updateProductModel, deleteProductModel, getProductModel, getAllProductsModel, getAllImagesByProductID } = require("../models/products.model");


const addProduct = async (req, res) => {
    try {
        const [data] = await insertProductModel(req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const [data] = await updateProductModel(req.params.id, req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const [data] = await deleteProductModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getProduct = async (req, res) => {
    try {
        const [data] = await getProductModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const [data] = await getAllProductsModel();
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

//--------------------------------------------------------------------

const getFullProduct = async (req, res) => {
    try {
        const [generalData] = await getProductModel(req.params.id);
        // console.log(generalData);
        const [imagesData] = await getAllImagesByProductID(req.params.id);
        // console.log(imagesData);

        res.send({
            data: {
                general: generalData[0],
                images: imagesData
            }
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllFullProducts = async (req, res) => {
    try {
        const [allProducts] = await getAllProductsModel();
        
        const productDetails = await Promise.all(allProducts.map(async (product) => {
            product.category = product.category;
            product.sale = product.sale ? true : false;
            product.tags = product.tags.split(',');
            const [discount] = await getDiscountModel(product.discounts_id);
            product.discount = discount[0].percent;
            const [images] = await getAllImagesByProductID(product.id);
            product.images = images;

            return product
        }));

        res.send({
            data: productDetails
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,

    getFullProduct,
    getAllFullProducts
};