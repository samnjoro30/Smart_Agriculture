import prisma from "../../../config/prisma.js";

export const createReply = async (data) => {
    // Check that the discussion exists
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
    
    // Create the reply
    const reply = await prisma.reply.create({
        data: {
            message: data.message,
            authorId: data.userId,
            discussionId: data.discussionId,
        },
        include: {
            discussion: {
                select: {
                    id: true,
                    title: true,
                    status: true,
                },
            },
        },
    });

    return reply;
};