import { HttpError } from "http-errors";
import { serverConfig } from "../server-config";
import { logger } from "../util/winston.logger";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message, error.stack);
    //* Handle custom http-errors
    if (error.status && error.statusCode && error.expose) {
        res.status(error.status).json({
            error: {
                errorCode: error.status,
                message: error.message,
                stackTrace:
                    serverConfig.ENVIRONMENT === "PRODUCTION" ? null : error.stack,
            },
        });
    } else {
        //* Handle internal server error(unexpected errors)
        res.status(500).json({
            error: {
                errorCode: 500,
                message:
                    serverConfig.ENVIRONMENT === "PRODUCTION"
                        ? "Internal Server Error"
                        : error.message,
                stackTrace:
                    serverConfig.ENVIRONMENT === "PRODUCTION" ? null : error.stack,
            },
        });
        next(error);
    }
}