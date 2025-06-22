const pool = require("../connection.js");

const postNewBundle = async (req, res) => {
    try {
        console.log("body: ", req.body);
        const { name, description, userId } = req.body;

        const query = "INSERT INTO daggerhub.Bundles (name, description, userId) VALUES (?, ?, ?)"

        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Database error");
            }

            connection.query(query, [name, description, userId], (error, results) => {
                connection.release();

                if (error) {
                    console.error(error);
                    return res.status(500).send("Dabase error");
                }

                res.send({
                    success: true,
                    message: "Bundle posted successfully",
                    res: results
                });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = postNewBundle;