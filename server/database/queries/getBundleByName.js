const pool = require("../connection.js");

const getBundleByName = (req, res) => {
    try {
        const { bundleName, ownerName } = req.body;

        if (!bundleName || !ownerName) {
            console.error("Missing required query parameter!");
            res.status(500).send("Missing required query parameter!");
        }

        const query = "SELECT id, name, description, downloads, createdAt, lastUpdated, username FROM daggerhub.Bundles WHERE name = ? and username = ?";

        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send("Database error");
            }

            connection.query(query, [bundleName, ownerName], (error, results) => {
                connection.release();

                if (error) {
                    console.error(error);
                    return res.status(500).send("Database error");
                }

                return res.status(200).send({
                    res: results,
                })
            })
        })
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

module.exports = getBundleByName;