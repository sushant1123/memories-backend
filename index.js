import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connection from "./connection/db_connection.js";
import v1Routes from "./routes/v1.routes.js";

const app = express();
dotenv.config();

//env variables
const PORT = process.env.PORT || 2000;

//db connection
connection();

//middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", v1Routes);

app.get("/", (req, res) => {
	res.send("Hello to Memories API");
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
