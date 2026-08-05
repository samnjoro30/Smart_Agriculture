import { createDiscussion } from "../services/discussion.service.js";

export const getDiscussions = async (req, res) => {
    return res.json({
        success: true,
        message: "Discussion endpoint is working",
    });
};

export const createDiscussionController = async (req, res) => {
    try {
        const discussion = await createDiscussion(req.body);

        return res.status(201).json({
            success: true,
            message: "Discussion created successfully",
            data: discussion,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create discussion",
        });
    }
};