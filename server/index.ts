import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { serverConfig } from "./server-config";
import { morganMiddleware } from "./middleware/morgan.middleware";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler.middleware";

const app: Express = express();
const port = serverConfig.PORT;

app.use(morganMiddleware);
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
    console.info(`⚡️[server]: Server is running at ${port}`);
});
