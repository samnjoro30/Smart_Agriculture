import { createDiscussion, getDiscussions, getDiscussionById } from "../services/discussion.service.js";

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

        if (error.message === "Category not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create discussion",
        });
    }
};


export const getDiscussionsController = async (req, res) => {
    try {
        const result = await getDiscussions(req.query);

        return res.status(200).json({
            success: true,
            message: "Discussions retrieved successfully",
            pagination: result.pagination,
            data: result.discussions,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve discussions",
        });
    }
};

export const getDiscussionByIdController = async (req, res) => {
    try {
        const { discussionId } = req.params;

        const discussion = await getDiscussionById(discussionId);

        return res.status(200).json({
            success: true,
            message: "Discussion retrieved successfully",
            data: discussion,
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
            message: "Failed to retrieve discussion",
        });
    }
};