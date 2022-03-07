import mongoose from "mongoose";

const connection = async () => {
	const mongodb_url = `${process.env.MONGODB_CONNECTION_URL_ATLAS_CLUSTER}/${process.env.MONGODB_DATABASE}`;
	// const mongodb_url = `${process.env.MONGODB_CONNECTION_URL_ATLAS_CLUSTER}/`;

	try {
		//if try works
		await mongoose.connect(mongodb_url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Mongodb Connected...");
	} catch (err) {
		//if try fails
		console.error(err);
		//exit process with failure
		// process.exit(1);
	}
};

export default connection;
