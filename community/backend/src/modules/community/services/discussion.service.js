import prisma from "../../../config/prisma.js";

export const createDiscussion = async (data) => {
    const discussion = await prisma.discussion.create({
        data: {
            authorId: data.userId,
            title: data.title,
            body: data.body,
            categoryId: data.categoryId,
        },
    });

    return discussion;
};