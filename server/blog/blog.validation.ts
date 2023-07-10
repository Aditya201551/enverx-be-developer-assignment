import * as yup from "yup"

export const getPostByFilterRequestSchema = yup.object({
    query: yup.object({
        category: yup.string().default("")
    })
})

export const getPostByIdRequestSchema = yup.object({
    params: yup.object({
        id: yup.string().uuid().required(),
    })
})

export const createPostRequestSchema = yup.object({
    body: yup.object({
        name: yup.string().required(),
        body: yup.string().required(),
        category: yup.string().required(),
    })
})

export const updatePostRequestSchema = yup.object({
    params: yup.object({
        id: yup.string().uuid().required(),
    }),
    body: yup.object({
        name: yup.string(),
        body: yup.string(),
        category: yup.string()
    })
})

export const deletePostRequestSchema = yup.object({
    params: yup.object({
        id: yup.string().uuid().required(),
    })
})

export type ICreateBlogInput = yup.InferType<typeof createPostRequestSchema>['body']
export type IUpdateBlogInput = yup.InferType<typeof updatePostRequestSchema>['body']