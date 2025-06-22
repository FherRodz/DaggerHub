const pool = require("../connection.js");

const getBundles = async (req, res) => {
    try {
        const query = "SELECT * FROM daggerhub.Bundles"

        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Database error");
            }

            connection.query(query, (error, results) => {
                connection.release();

                if (error) {
                    console.error(error);
                    return res.status(500).send("Database error");
                }

                res.send({
                    success: true,
                    message: "Retrieved all bundles successfully",
                    res: results
                });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = getBundles;