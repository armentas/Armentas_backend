const { insertCollectionModel, updateCollectionModel, getCollectionModel, getAllCollectionsModel, deleteCollectionModel } = require("../models/collections.model");
const { connectionAws } = require("../configs/aws.config");
const { uploadOneImage } = require("../util/upload");
const fs = require('fs');

const addCollection = async (req, res) => {
    try {
        const [data] = await insertCollectionModel(req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateCollection = async (req, res) => {
    try {
        const [data] = await updateCollectionModel(req.params.id, req.body);
        res.send({
            data
        });

    } catch (error) {       
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteCollection = async (req, res) => {
    try {
        const [data] = await deleteCollectionModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getCollection = async (req, res) => {
    try {
        const [data] = await getCollectionModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllCollections = async (req, res) => {
    try {
        const [data] = await getAllCollectionsModel();
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const addImageFile = async (req, res) => {
    try {
        const file = req.file;

        const s3 = connectionAws();
        let img_urlResult = '';

        if (!file) {
            return res.status(400).send('There is not a file uploaded');
        }
        // Crear un buffer con los datos leídos
        const imgData = fs.readFileSync(file.path);

        // Guardar imagen en S3 y obtener la url
        const uploadedImage = await uploadOneImage(
            Buffer.from(imgData),
            `collection_image_${file.originalname}`,
            process.env.BUCKET_ARMENTAS_TEST,
            file.mimetype,
            s3
        );
        img_urlResult = uploadedImage.Location;

        res.send({
            data: img_urlResult
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message,
        });
    }
}

module.exports = {
    addCollection,
    updateCollection,
    deleteCollection,
    getCollection,
    getAllCollections,
    addImageFile
};