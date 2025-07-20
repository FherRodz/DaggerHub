const pool = require("../connection.js");


const updateDownloadBundle = (req, res) => {
    try {
        const { bundleId } = req.body;
        if (!bundleId) {
            console.error("Missing required query parameter!");
            res.status(500).send("Missing required parameter!");
        }

        const query = "UPDATE daggerhub.Bundles SET downloads = downloads+1 WHERE id = ?";

        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Database error");
            }

            connection.query(query, [bundleId], (error, results) => {
                connection.release();

                if (error) {
                    console.error(error);
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

module.exports = updateDownloadBundle;