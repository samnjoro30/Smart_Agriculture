import { Router } from "express";
import { validate } from "../../../middlewares/validate.middleware.js";
import { createDiscussionSchema } from "../validators/discussion.validator.js";
import { createCategorySchema } from "../validators/category.validator.js";
import { getDiscussionsController, createDiscussionController, getDiscussionByIdController, } from "../controllers/discussion.controller.js";
import { createCategoryController, getCategoriesController, } from "../controllers/category.controller.js";
import { createReplyController } from "../controllers/reply.controller.js";
import { createReplySchema } from "../validators/reply.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

router.get("/categories", getCategoriesController);

router.post( "/categories", validate(createCategorySchema), createCategoryController );
/*
|--------------------------------------------------------------------------
| Discussions
|--------------------------------------------------------------------------
*/

router.get("/discussions", getDiscussionsController);

router.post( "/discussions", validate(createDiscussionSchema), createDiscussionController );

router.get( "/discussions/:discussionId", getDiscussionByIdController );


/*
|--------------------------------------------------------------------------
| Replies
|--------------------------------------------------------------------------
*/

router.post( "/replies", validate(createReplySchema), createReplyController );

export default router;