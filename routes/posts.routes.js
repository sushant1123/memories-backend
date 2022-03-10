import express from "express";

import {
	getPost,
	getAllPosts,
	getAllPostsBySearch,
	createPost,
	updatePost,
	deletePost,
	likePost,
	commentPost,
} from "../controllers/posts.controller.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/search", getAllPostsBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
