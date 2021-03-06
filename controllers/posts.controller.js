import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
	try {
		const { id } = req.params;

		const post = await PostMessage.findById(id);

		return res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getAllPosts = async (req, res) => {
	try {
		const { page } = req.query;

		const LIMIT = 8; //post limit per page
		const startIndex = (Number(page) - 1) * 8; //get the starting index of every page

		//count the total number of docs
		const totalPosts = await PostMessage.countDocuments();

		//find the posts based on page and return LIMIT no. of pages
		const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			numberOfPages: Math.ceil(totalPosts / LIMIT),
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getAllPostsBySearch = async (req, res) => {
	try {
		const { searchQuery, tags } = req.query;

		//convert it into regex and ignore the case
		const title = new RegExp(searchQuery, "i");

		//find  all the posts which has either matching title or tags
		const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

		return res.status(200).json({ data: posts });
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
			tags: post.tags,
			selectedFile: post.selectedFile,
			likeCount: post.likeCount,
			name: post.name,
		};

		const newPost = new PostMessage({ ...obj, creator: req.userId });
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

		if (!req.userId) {
			return res.json({ message: "Unauthenticated" });
		}

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

		const post = await PostMessage.findById(id);

		// to check if the user already liked the post or not.
		const index = post.likes.findIndex((id) => id === String(req.userId));

		if (index === -1) {
			//like the post
			post.likes.push(req.userId);
		} else {
			//dislike the post
			post.likes = post.likes.filter((id) => id !== String(req.userId));
		}

		const updatedPost = await PostMessage.findByIdAndUpdate(
			id,
			// { likeCount: post.likeCount + 1 },
			post,
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("updatePost::", error);
		res.status(409).json({ message: error.message });
	}
};

export const commentPost = async (req, res) => {
	try {
		const { id } = req.params;
		const { value } = req.body;

		if (!req.userId) {
			return res.json({ message: "Unauthenticated" });
		}

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

		const post = await PostMessage.findById(id);

		post.comments.push(value);

		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
		return res.status(200).json(updatedPost);
	} catch (error) {
		console.log("commentPost::", error);
		res.status(409).json({ message: error.message });
	}
};
