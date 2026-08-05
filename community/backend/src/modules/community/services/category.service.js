import prisma from "../../../config/prisma.js";

export const createCategories = async (categories) => {
    // Check for duplicate names in the request itself
    const names = categories.map((category) => category.name.trim());

    const duplicateNames = names.filter(
        (name, index) => names.indexOf(name) !== index
    );

    if (duplicateNames.length > 0) {
        throw new Error(
            `Duplicate category names in request: ${[
                ...new Set(duplicateNames),
            ].join(", ")}`
        );
    }

    // Check if any categories already exist in the database
    const existing = await prisma.communityCategory.findMany({
        where: {
            name: {
                in: names,
            },
        },
    });

    if (existing.length > 0) {
        throw new Error(
            `Category already exists: ${existing
                .map((c) => c.name)
                .join(", ")}`
        );
    }

    // Create everything in one transaction
    const createdCategories = await prisma.$transaction(
        categories.map((category) =>
            prisma.communityCategory.create({
                data: category,
            })
        )
    );

    return createdCategories;
};

export const getCategories = async () => {
    const categories = await prisma.communityCategory.findMany({
        orderBy: {
            name: "asc",
        },
        select: {
            id: true,
            name: true,
            description: true,
            _count: {
                select: {
                    discussions: true,
                },
            },
        },
    });
    return categories;
};