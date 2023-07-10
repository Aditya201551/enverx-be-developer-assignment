import { blog_post } from "@prisma/client"
import { blogModel } from "./blog.model"
import createHttpError from "http-errors";
import { ICreateBlogInput, IUpdateBlogInput } from "./blog.validation";

/* 
* added a service function with single line because model function should not be called via routes,
* (service function enables dev to add other business login to the code, if required)*/
const getPostsByFilter = async ({ category }: { category: blog_post["category"] }) => {
    const posts = await blogModel.getPostsByFilter({ category });
    return posts;
}

const getBlogById = async ({ id }: { id: blog_post["id"] }) => {
    const blog = await blogModel.getPostById({ id });

    if (!blog) {
        throw createHttpError(404, "Post not found");
    }

    return blog;
}

const createPost = async ({ data }: { data: ICreateBlogInput }) => {
    const createdPost = await blogModel.createPost({ data });
    return createdPost;
}

const updatePost = async ({ id, data }: { id: blog_post["id"], data: IUpdateBlogInput }) => {
    const updatedPost = await blogModel.updatePost({ id, data });
    return updatedPost;
}

const deletePost = async ({ id }: { id: blog_post["id"] }) => {
    const deletedPost = await blogModel.deletePost({ id });
    return deletedPost;
}

//* single export to keep imports clean in other files
export const blogService = { getPostsByFilter, getBlogById, createPost, updatePost, deletePost }