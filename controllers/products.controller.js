const { deleteImageByProductIdModel, getImageByProductIdModel } = require("../models/images.model");
const { insertProductModel, updateProductModel, deleteProductModel, getProductModel, getAllProductsModel, getAllImagesByProductID } = require("../models/products.model");
const { connectionAws } = require("../configs/aws.config");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getAllCollectionsModel } = require("../models/collections.model");

const addProduct = async (req, res) => {
    try {
        const [data] = await insertProductModel(req.body);
        res.send({
            data
        });

    } catch (error) {
        console.log(error);
        
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
        const s3 = connectionAws();
        //Obtener todas las imagenes
        const [dataImages] = await getImageByProductIdModel(req.params.id);

        // Borrar imagenes en el Bucket de S3
        const result = await Promise.all(dataImages.map( async (image) => {
            const param = {
                Bucket: process.env.BUCKET_ARMENTAS_TEST,
                Key: image.img_key
            }
            const command = new DeleteObjectCommand(param);
            await s3.send(command);
        }));
        
        const [deleteImage] = await deleteImageByProductIdModel(req.params.id);
        const [data] = await deleteProductModel(req.params.id);

        res.send({
            deleteImage,
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
        const [allCollections] = await getAllCollectionsModel();
        
        const productDetails = await Promise.all(allProducts.map(async (product) => {
            product.collection = allCollections.filter(col => col.id === product.collection)[0].name;
            product.category = product.category;
            product.sale = product.sale ? true : false;
            product.tags = product.tags.split(',');
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