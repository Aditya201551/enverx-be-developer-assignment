import { Prisma, blog_post } from "@prisma/client"
import { prisma } from "../../prisma/prisma.client"

const getPostsByFilter = async ({ category }: { category?: blog_post["category"] } = {}) => {
    const query: Prisma.blog_postFindManyArgs = {
        orderBy: [
            {
                createdAt: "desc"
            },
            {
                name: "asc"
            }
        ]
    };

    if (category) {
        query.where = {
            category
        };
    }

    const posts = await prisma.blog_post.findMany(query);
    return posts;

}

const getPostById = async ({ id }: { id: blog_post["id"] }) => {
    const post = await prisma.blog_post.findUnique({
        where: { id }
    });

    return post
}

const createPost = async ({ data }: { data: Prisma.blog_postCreateInput }) => {
    const post = await prisma.blog_post.create({
        data
    });

    return post;
}

const updatePost = async ({ id, data }: { id: blog_post["id"], data: Prisma.blog_postUpdateInput }) => {
    const post = await prisma.blog_post.update({
        data,
        where: { id }
    });

    return post;
}

const deletePost = async ({ id }: { id: blog_post["id"] }) => {
    const post = await prisma.blog_post.delete({
        where: {
            id
        }
    })
    return post;
}

//* single export to keep imports clean in other files
export const blogModel = { getPostsByFilter, getPostById, createPost, updatePost, deletePost }