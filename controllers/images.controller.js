const { updateImageModel, deleteImageModel, getImageModel, getAllImageModel, insertImageModel, getImageByProductIdModel } = require("../models/images.model");
const { connectionAws } = require("../configs/aws.config");
const { uploadOneImage } = require("../util/upload");
const fs = require('fs');


const addImageUrl = async (req, res) => {
    try {
        const id_product = req.params.id;
        const img_url = req.body.img_url;

        const s3 = connectionAws();
        let img_urlResult = '';

        const response = await fetch(img_url);
        if (!response.ok) {
            return {
                error: `Failed to fetch image`
            }
        } else {
            // Fragmentar la URL para obtener el nombre de la imagen
            const segments = img_url.split('/');
            const name = segments[segments.length - 1].split('.')[0];

            // Obtener el buffer de imagen
            const imageBuffer = await response.arrayBuffer();

            // Guardar imagen en S3 y obtener la url
            const uploadedImage = await uploadOneImage(
                Buffer.from(imageBuffer),
                name,
                process.env.BUCKET_ARMENTAS_TEST,
                "image/png",
                s3
            );

            img_urlResult = uploadedImage.Location;
        }

        const [data] = await insertImageModel({ id_product, img_url: img_urlResult });

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

const addImageFile = async (req, res) => {
    try {
        const id_product = req.params.id;
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
            file.originalname,
            process.env.BUCKET_ARMENTAS_TEST,
            file.mimetype,
            s3
        );

        img_urlResult = uploadedImage.Location;

        const [data] = await insertImageModel({ id_product, img_url: img_urlResult });
        
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

const updateImage = async (req, res) => {
    try {
        const [data] = await updateImageModel(req.params.id, req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteImage = async (req, res) => {
    try {
        const [data] = await deleteImageModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImage = async (req, res) => {
    try {
        const [data] = await getImageModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImageByProductId = async (req, res) => {
    try {
        const [data] = await getImageByProductIdModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllImages = async (req, res) => {
    try {
        const [data] = await getAllImageModel();

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

//----------------------------------------------------

module.exports = {
    addImageUrl,
    addImageFile,
    updateImage,
    deleteImage,
    getImage,
    getAllImages,
    getImageByProductId
}