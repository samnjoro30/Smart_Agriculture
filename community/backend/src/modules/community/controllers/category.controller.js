import { createCategories, getCategories } from "../services/category.service.js";

export const createCategoryController = async (req, res) => {
    try {
        const categories = await createCategories(req.body);

        return res.status(201).json({
            success: true,
            message:
                categories.length === 1
                    ? "Category created successfully"
                    : `${categories.length} categories created successfully`,
            data: categories,
        });
    } catch (error) {
        console.error(error);

        // Duplicate category
        if (
            error.message.startsWith("Category already exists") ||
            error.message.startsWith("Duplicate category names")
        ) {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create category",
        });
    }
};

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories();

        return res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve categories",
        });
    }
};