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