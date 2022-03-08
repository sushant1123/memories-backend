import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},

		message: {
			type: String,
		},

		creator: {
			type: String,
		},

		name: {
			type: String,
		},

		tags: [String],

		selectedFile: {
			type: String,
		},

		likes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
