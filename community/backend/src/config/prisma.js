import prismaPkg from "pg";
import dns from "dns/promises";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const { Pool } = prismaPkg;

const databaseUrl = new URL(process.env.DATABASE_URL);

// Resolve Neon hostname to an IPv4 address
const ipv4Addresses = await dns.resolve4(databaseUrl.hostname);

if (!ipv4Addresses.length) {
    throw new Error("Could not resolve Neon PostgreSQL hostname");
}

const host = ipv4Addresses[0];

console.log(`🔌 Connecting to PostgreSQL via IPv4: ${host}`);

const pool = new Pool({
    host,
    port: Number(databaseUrl.port) || 5432,
    database: databaseUrl.pathname.slice(1),
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),

    ssl: {
        rejectUnauthorized: true,
        servername: databaseUrl.hostname,
    },

    connectionTimeoutMillis: 10000,
});

const adapter = new PrismaPg(pool, {
    schema: "community",
});

const prisma = new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
});

export default prisma;
