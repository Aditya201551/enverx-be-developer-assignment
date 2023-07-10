import morgan from "morgan";
import { logger } from "../util/winston.logger";
import { StreamOptions } from "morgan";

const stream: StreamOptions = {
    write(message) {
        logger.http(message);
    },
};

export const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream }
);
