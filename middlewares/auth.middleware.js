import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		//get the token
		const token = req.headers.authorization.split(" ")[1];

		//check if it is out token or google's token
		const isCustomAuth = token.length < 500;

		//decode the token
		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, "secret");

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub; // unique id of user
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
