import {
    likeDiscussion,
    unlikeDiscussion,
} from "../services/like.service.js";


export const likeDiscussionController = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { userId } = req.body;

        const result = await likeDiscussion(
            discussionId,
            userId
        );

        return res.status(201).json({
            success: true,
            message: "Discussion liked successfully",
            data: result,
        });

    } catch (error) {
        console.error(error);

        if (error.message === "Discussion not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Discussion already liked") {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to like discussion",
        });
    }
};


export const unlikeDiscussionController = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { userId } = req.body;

        const result = await unlikeDiscussion(
            discussionId,
            userId
        );

        return res.status(200).json({
            success: true,
            message: "Discussion unliked successfully",
            data: result,
        });

    } catch (error) {
        console.error(error);

        if (error.message === "Discussion not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Discussion has not been liked") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to unlike discussion",
        });
    }
};