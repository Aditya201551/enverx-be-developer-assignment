import dotenv from "dotenv";
dotenv.config();

const getEnvironmentVariables = (name: string, required = true) => {
    if (!process.env[name] && required) {
        throw new Error(`Couldn't find environment variables: ${name}}`);
    } else {
        return process.env[name];
    }
};
//* load all envs before starting up the server
export const serverConfig = {
    DATABASE_URL: getEnvironmentVariables("DATABASE_URL") || "",
    ENVIRONMENT: getEnvironmentVariables("ENVIRONMENT") || "",
    PORT: getEnvironmentVariables("PORT") || "",
};
