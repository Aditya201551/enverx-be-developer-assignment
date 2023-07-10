import express from "express"
import { postRouter } from "./blog/blog.routes";

export const router = express.Router();

router.use('/posts', postRouter)