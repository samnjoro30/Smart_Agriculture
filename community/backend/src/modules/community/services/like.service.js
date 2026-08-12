import prisma from "../../../config/prisma.js";

export const likeDiscussion = async (discussionId, userId) => {
    // Check that the discussion exists
    const discussion = await prisma.discussion.findUnique({
        where: {
            id: discussionId,
        },
        select: {
            id: true,
        },
    });

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    // Check if the user has already liked this discussion
    const existingLike = await prisma.discussionLike.findUnique({
        where: {
            discussionId_userId: {
                discussionId,
                userId,
            },
        },
    });

    if (existingLike) {
        throw new Error("Discussion already liked");
    }

    // Create the like
    await prisma.discussionLike.create({
        data: {
            discussionId,
            userId,
        },
    });

    // Get updated like count
    const likeCount = await prisma.discussionLike.count({
        where: {
            discussionId,
        },
    });

    return {
        liked: true,
        likeCount,
    };
};

export const unlikeDiscussion = async (discussionId, userId) => {
    // Check that the discussion exists
    const discussion = await prisma.discussion.findUnique({
        where: {
            id: discussionId,
        },
        select: {
            id: true,
        },
    });

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    // Find the user's like
    const existingLike = await prisma.discussionLike.findUnique({
        where: {
            discussionId_userId: {
                discussionId,
                userId,
            },
        },
    });

    if (!existingLike) {
        throw new Error("Discussion has not been liked");
    }

    // Remove the like
    await prisma.discussionLike.delete({
        where: {
            id: existingLike.id,
        },
    });

    // Get updated like count
    const likeCount = await prisma.discussionLike.count({
        where: {
            discussionId,
        },
    });

    return {
        liked: false,
        likeCount,
    };
};