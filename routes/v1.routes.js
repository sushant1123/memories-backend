import express from "express";

import postRoutes from "./posts.routes.js";
import userRoutes from "./users.routes.js";

const router = express.Router();

router.use("/v1/posts", postRoutes);
router.use("/v1/users", userRoutes);

router.all("*", (req, res) => {
	res.json({ status: "error", message: "invalid route!" });
});

export default router;
