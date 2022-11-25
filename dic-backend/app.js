const express = require("express");
const cors = require("cors");
const en_vnRouter  =require("./app/routes/en-vnRoute");
const fr_vnRouter  =require("./app/routes/fr-vnRoute");
const apiError = require("./app/apiError");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application!" });
});
app.use("/api/eng", en_vnRouter);
app.use("/api/fra", fr_vnRouter);

//handle 404
app.use((req, res, next) =>{
    return next(new apiError(404, "Resource not found"));
});

//define error-handling middleware last
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internet Server Error",
    });
});

module.exports = app;