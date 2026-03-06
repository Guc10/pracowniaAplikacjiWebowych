import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/client";

const adapter = new PrismaMariaDb({
    host: "localhost",
    user: "root",
    password: "123",
    database: "messenger",
    connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };