const pool = require("../connection.js");

const postNewDownload = (req, res) => {
    try {
        const { bundleId, ownerName } = req.body;

        if (!bundleId || !ownerName) {
            console.error("Missing required query parameters!");
            res.status(500).send("Missing required query parameters!");
        }

        const query = "INSERT INTO daggerhub.BundleDownloads (bundleId, username) VALUES (?, ?)"

        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Database error");
            }

            connection.query(query, [bundleId, ownerName], (error, results) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return res.status(500).send("Database error");
                }

                res.status(200).send({
                    res: results
                });
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

module.exports = postNewDownload;