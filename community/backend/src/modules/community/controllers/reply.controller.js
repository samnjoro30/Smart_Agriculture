import { createReply, getRepliesByDiscussion, updateReply, deleteReply } from "../services/reply.service.js";

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


export const getRepliesByDiscussionController = async (req, res) => {
    try {
        const { discussionId } = req.params;

        const result = await getRepliesByDiscussion(
            discussionId,
            req.query
        );

        return res.status(200).json({
            success: true,
            message: "Replies retrieved successfully",
            data: result.replies,
            pagination: result.pagination,
        });

    } catch (error) {
        console.error(error);

        if (error.message === "Discussion not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve replies",
        });
    }
};

export const updateReplyController = async (req, res) => {
    try {
        const { replyId } = req.params;
        const { userId, message } = req.body;

        const updatedReply = await updateReply(
            replyId,
            userId,
            message
        );

        return res.status(200).json({
            success: true,
            message: "Reply updated successfully",
            data: updatedReply,
        });

    } catch (error) {
        console.error(error);

        if (error.message === "Reply not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "You are not allowed to edit this reply") {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to update reply",
        });
    }
};

export const deleteReplyController = async (req, res) => {
    try {
        const { replyId } = req.params;
        const { userId } = req.body;

        const deletedReply = await deleteReply(
            replyId,
            userId
        );

        return res.status(200).json({
            success: true,
            message: "Reply deleted successfully",
            data: deletedReply,
        });

    } catch (error) {
        console.error(error);

        if (error.message === "Reply not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "You are not allowed to delete this reply") {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to delete reply",
        });
    }
};