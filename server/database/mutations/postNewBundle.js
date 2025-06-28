const pool = require("../connection.js");
const { S3 } = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const postNewBundle = async (req, res) => {
    try {
        const userId = req.auth?.payload?.sub;
        const username = req.auth?.payload?.username;
        const { name, description, fileType } = req.body;

        if (!userId || !name || !description || !fileType) {
            res.status(500).send("Missing query parameters!");
        }

        const bundleId = uuidv4();

        const query = "INSERT INTO daggerhub.Bundles (id, name, description, userId, username) VALUES (?, ?, ?, ?, ?)"

        await new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Database error");
                }

                connection.query(query, [bundleId, name, description, userId, username], (error, results) => {
                    connection.release();

                    if (error) {
                        if (error.code === "ER_DUP_ENTRY") {
                            return res.status(409).json({ error: 'You already have a bundle with this name.'});
                        }
                        console.error(error);
                        return res.status(500).send("Dabase error");
                    }
                    resolve(results);
                });
            });
        });
        

        // Generate S3 upload URl
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `bundles/${bundleId}.pdf`,
            ContentType: fileType,
            Expires: 60,
        };
        const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

        res.status(200).json({ uploadUrl, bundleId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = postNewBundle;