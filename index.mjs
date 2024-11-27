import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
import routers from "./routers/index.mjs";
import path from "node:path";
const __dirname = import.meta.dirname;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routers.apiRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})