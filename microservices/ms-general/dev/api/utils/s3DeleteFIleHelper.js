import aws from 'aws-sdk';

const s3 = new aws.S3();

const deleteS3File = (key) => s3.deleteObject({
    Bucket: `${process.env.BUCKET_NAME}`,
    Key: key,
});

module.exports = deleteS3File;
