import { Router } from "express"
import { blogService } from "./blog.service"
import { validate } from "../middleware/validation.middleware"
import {
    ICreateBlogInput,
    createPostRequestSchema,
    deletePostRequestSchema,
    getPostByFilterRequestSchema,
    getPostByIdRequestSchema,
    updatePostRequestSchema
} from "./blog.validation"
import { blog_post } from "@prisma/client"

export const postRouter = Router()

postRouter.get<
    never,
    blog_post[],
    never,
    { category: string }>(
        '/',
        validate(getPostByFilterRequestSchema),
        async (req, res, next) => {
            try {
                const { category } = req.query
                const response = await blogService.getPostsByFilter({ category });
                res.status(200).json(response);
            } catch (error) {
                next(error)
            }
        }
    )

postRouter.get<
    { id: string },
    blog_post
>(
    '/:id',
    validate(getPostByIdRequestSchema),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await blogService.getBlogById({ id });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
)

postRouter.post<
    never,
    blog_post,
    ICreateBlogInput
>(
    '/',
    validate(createPostRequestSchema),
    async (req, res, next) => {
        try {
            const response = await blogService.createPost({ data: req.body });
            res.status(201).json(response);
        } catch (error) {
            next(error)
        }
    }
)

postRouter.put<
    {
        id: blog_post["id"],
    },
    blog_post
>(
    '/:id',
    validate(updatePostRequestSchema),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await blogService.updatePost({ id, data: req.body });
            res.status(202).json(response);
        } catch (error) {
            next(error);
        }
    }
)

postRouter.delete<
    { id: blog_post["id"] },
    { deleted: boolean, data: blog_post }
>('/:id',
    validate(deletePostRequestSchema),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await blogService.deletePost({ id });
            res.status(200).json({ deleted: true, data: response })
        } catch (error) {
            next(error);
        }
    }
)