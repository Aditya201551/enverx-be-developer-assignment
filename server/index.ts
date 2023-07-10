import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { serverConfig } from "./server-config";
const app: Express = express();
const port = serverConfig.PORT;

app.use(express.json());
app.get('/', (req, res) => res.status(200).send("init server"))

app.listen(port, () => {
    console.info(`⚡️[server]: Server is running at ${port}/`);
});
