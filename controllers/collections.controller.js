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

        // Eliminar el archivo temporal después de subirlo a S3
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error(`Error deleting temporary file: ${err}`);
            } else {
                console.log(`Temporary file ${file.path} deleted.`);
            }
        });

        res.send({
            data: img_urlResult
        });

    } catch (error) {
        // Manejo de errores: eliminar archivo temporal si ocurre un error
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error(`Error deleting temporary file: ${err}`);
                }
            });
        }
        
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