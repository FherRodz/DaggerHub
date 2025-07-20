const pool = require("../connection.js");

const getBundleById = async (req, res) => {
    try {
        const { bundleId } = req.body;

        const query = "SELECT id, name, description, downloads, createdAt, lastUpdated, username FROM daggerhub.Bundles WHERE id = ?"

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

                res.send({
                    success: true,
                    message: "Retrieved bundle by its id successfully",
                    res: results
                });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = getBundleById;