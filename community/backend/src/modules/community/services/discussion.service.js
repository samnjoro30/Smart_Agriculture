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

    const userId = query.userId;

    const total = await prisma.discussion.count({
        where,
    });

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

            likes: userId
                ? {
                    where: {
                        userId,
                    },
                    select: {
                        id: true,
                    },
                }
                : false,

            _count: {
                select: {
                    replies: true,
                    likes: true,
                },
            },
        },
    });

    const formattedDiscussions = discussions.map((discussion) => {
        const { likes, ...rest } = discussion;

        return {
            ...rest,

            likeCount: discussion._count.likes,
            replyCount: discussion._count.replies,

            likedByCurrentUser: userId
                ? likes.length > 0
                : false,
        };
    });

    return {
        discussions: formattedDiscussions,

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

export const getDiscussionById = async (discussionId, userId) => {
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

            likes: userId
                ? {
                    where: {
                        userId,
                    },
                    select: {
                        id: true,
                    },
                }
                : false,

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

    const { likes, ...rest } = discussion;

    return {
        ...rest,

        likeCount: discussion._count.likes,
        replyCount: discussion._count.replies,

        likedByCurrentUser: userId
            ? likes.length > 0
            : false,
    };
};

