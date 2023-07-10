import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | null = null;

//* export prisma client in a singleton pattern(as db connections should be handled with caution)
const getInstance = () => {
    if (!prismaInstance) prismaInstance = new PrismaClient();

    return prismaInstance;
};

export const prisma = getInstance();
