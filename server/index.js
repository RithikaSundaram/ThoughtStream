const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = 3000;
const app = express();
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connected Successfully");
	})
	.catch(err => {
		console.error(err);
	});
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);

app.listen(port, () => {
	console.log(`Server connected on ${port}`);
});
