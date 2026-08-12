import prisma from "../../../config/prisma.js";

export const createReply = async (data) => {
    // Check discussion exists
    const discussion = await prisma.discussion.findUnique({
        where: {
            id: data.discussionId,
        },
    });

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    if (discussion.status !== "OPEN") {
        throw new Error("Discussion is closed");
    }

    // If replying to another reply, validate it
    if (data.replyToId) {
        const parentReply = await prisma.reply.findUnique({
            where: {
                id: data.replyToId,
            },
        });

        if (!parentReply) {
            throw new Error("Reply being referenced was not found");
        }

        if (parentReply.discussionId !== data.discussionId) {
            throw new Error("Reply does not belong to this discussion");
        }
    }

    // Create reply
    const reply = await prisma.reply.create({
        data: {
            message: data.message,
            authorId: data.userId,
            discussionId: data.discussionId,
            replyToId: data.replyToId ?? null,
        },

        include: {
            discussion: {
                select: {
                    id: true,
                    title: true,
                    status: true,
                },
            },

            replyTo: {
                select: {
                    id: true,
                    authorId: true,
                    message: true,
                },
            },
        },
    });

    return reply;
};


export const getRepliesByDiscussion = async (discussionId, query) => {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 50);

    const skip = (page - 1) * limit;

    // Make sure the discussion exists
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

    // Get total number of replies
    const total = await prisma.reply.count({
        where: {
            discussionId,
        },
    });

    // Get paginated replies
    const replies = await prisma.reply.findMany({
        where: {
            discussionId,
        },

        skip,
        take: limit,

        orderBy: {
            createdAt: "asc",
        },

        include: {
            replyTo: {
                select: {
                    id: true,
                    authorId: true,
                    message: true,
                },
            },
        },
    });

    return {
        replies,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrevious: page > 1,
        },
    };
};

export const updateReply = async (replyId, userId, message) => {
    const reply = await prisma.reply.findUnique({
        where: {
            id: replyId,
        },
    });

    if (!reply) {
        throw new Error("Reply not found");
    }

    // Only the author can edit the reply
    if (reply.authorId !== userId) {
        throw new Error("You are not allowed to edit this reply");
    }

    const updatedReply = await prisma.reply.update({
        where: {
            id: replyId,
        },

        data: {
            message,
        },

        include: {
            replyTo: {
                select: {
                    id: true,
                    authorId: true,
                    message: true,
                },
            },
        },
    });

    return updatedReply;
};

export const deleteReply = async (replyId, userId) => {
    const reply = await prisma.reply.findUnique({
        where: {
            id: replyId,
        },
    });

    if (!reply) {
        throw new Error("Reply not found");
    }

    // Only the author can delete the reply
    if (reply.authorId !== userId) {
        throw new Error("You are not allowed to delete this reply");
    }

    await prisma.reply.delete({
        where: {
            id: replyId,
        },
    });

    return {
        id: replyId,
    };
};