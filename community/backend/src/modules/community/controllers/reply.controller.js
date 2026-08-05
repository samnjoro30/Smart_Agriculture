import { createReply } from "../services/reply.service.js";

export const createReplyController = async (req, res) => {
    try {
        const reply = await createReply(req.body);

        return res.status(201).json({
            success: true,
            message: "Reply created successfully",
            data: reply,
        });

    } catch (error) {
        console.error(error);

        if (error.message === "Discussion not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Discussion is closed") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create reply",
        });
    }
};