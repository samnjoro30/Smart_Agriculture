import prisma from "../../../config/prisma.js";

export const createDiscussion = async (data) => {
    // Check that the category exists
    const category = await prisma.communityCategory.findUnique({
        where: {
            id: data.categoryId,
        },
    });

    if (!category) {
        throw new Error("Category not found");
    }

    // Create the discussion
    const discussion = await prisma.discussion.create({
        data: {
            title: data.title,
            body: data.body,
            authorId: data.userId,
            categoryId: data.categoryId,
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    replies: true,
                    likes: true,
                },
            },
        },
    });

    return discussion;
};


export const getDiscussions = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 10, 50);

    const skip = (page - 1) * limit;

    const where = {};

    if (query.categoryId) {
        where.categoryId = query.categoryId;
    }

    if (query.status) {
        where.status = query.status;
    }

    // Get total number of discussions
    const total = await prisma.discussion.count({
        where,
    });

    // Get paginated discussions
    const discussions = await prisma.discussion.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    replies: true,
                    likes: true,
                },
            },
        },
    });

    return {
        discussions,
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

export const getDiscussionById = async (discussionId) => {
    const discussion = await prisma.discussion.findUnique({
        where: {
            id: discussionId,
        },

        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                },
            },

            replies: {
                orderBy: {
                    createdAt: "asc",
                },

                select: {
                    id: true,
                    message: true,
                    authorId: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },

            _count: {
                select: {
                    replies: true,
                    likes: true,
                },
            },
        },
    });

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    return discussion;
};


