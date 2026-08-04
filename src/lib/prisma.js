import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

console.log('DATABASE_URL', process.env.DATABASE_URL);
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

export const prismaClient = new PrismaClient({
    adapter,
});
