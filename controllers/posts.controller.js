import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getAllPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		// console.log(postMessages);
		res.status(200).json(postMessages);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	try {
		const { post } = req.body;
		let obj = {
			title: post.title,
			message: post.message,
			creator: post.creator,
			tags: post.tags,
			selectedFile: post.selectedFile,
			likeCount: post.likeCount,
		};

		const newPost = new PostMessage(obj);
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		console.log(error);
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	try {
		const { id } = req.params;

		const post = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

		const updatedPost = await PostMessage.findByIdAndUpdate({ _id: id }, { ...post, id }, { new: true });
		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("updatePost::", error);
		res.status(409).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

		await PostMessage.findByIdAndDelete(id);
		// console.log("delete");
		res.json({ message: "post deleted successfully" });
	} catch (error) {
		console.log("updatePost::", error);
		res.status(409).json({ message: error.message });
	}
};

export const likePost = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

		const post = await PostMessage.findById(id);

		const updatedPost = await PostMessage.findByIdAndUpdate(
			id,
			// { likeCount: post.likeCount + 1 },
			{ $inc: { likeCount: 1 } },
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("updatePost::", error);
		res.status(409).json({ message: error.message });
	}
};
