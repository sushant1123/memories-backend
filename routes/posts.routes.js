import express from "express";

import {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from "../controllers/posts.controller.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
