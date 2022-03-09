import multer from 'multer';
import { resolve } from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
    local: multer.diskStorage({
        destination: resolve(__dirname, '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            return cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
    }),

    s3: multerS3({
        // Lê as informações definidas no .env automaticamente
        s3: new aws.S3(),
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            return cb(
                null,
                `register/${uniqueSuffix}-${file.originalname.replace(/[^0-9a-zA-Z]+/g, '')}`
            );
        },
    }),
};

module.exports = {
    storage: storageTypes[process.env.STORAGE_TYPE],
};
