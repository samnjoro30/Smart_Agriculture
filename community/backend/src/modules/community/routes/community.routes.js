import { Router } from "express";

import { validate } from "../../../middlewares/validate.middleware.js";

import { createDiscussionSchema } from "../validators/discussion.validator.js";
import { createCategorySchema } from "../validators/category.validator.js";

import {
    getDiscussionsController,
    createDiscussionController,
} from "../controllers/discussion.controller.js";

import {
    createCategoryController,
    getCategoriesController,
} from "../controllers/category.controller.js";


const router = Router();

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

router.get("/categories", getCategoriesController);

router.post(
    "/categories",
    validate(createCategorySchema),
    createCategoryController
);
/*
|--------------------------------------------------------------------------
| Discussions
|--------------------------------------------------------------------------
*/

router.get("/discussions", getDiscussionsController);

router.post(
    "/discussions",
    validate(createDiscussionSchema),
    createDiscussionController
);

export default router;