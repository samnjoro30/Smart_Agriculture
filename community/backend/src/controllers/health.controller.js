import prisma from "../config/prisma.js";

export const healthCheck = async (req, res) => {
    try {
        // Simple database connectivity check
        await prisma.$queryRaw`SELECT 1`;

        return res.status(200).json({
            success: true,
            service: "Community Service",
            status: "healthy",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            service: "Community Service",
            status: "unhealthy",
            database: "disconnected",
            error: error.message,
        });
    }
};