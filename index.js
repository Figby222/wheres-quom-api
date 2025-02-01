const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const routers = require("./routers/index.js");
const path = require("node:path");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routers.apiRouter);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        error: error
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})