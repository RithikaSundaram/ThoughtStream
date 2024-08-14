const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (
			!username ||
			!email ||
			!password ||
			username === "" ||
			email === "" ||
			password === ""
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const newUser = new User({ username, email, password });
		await newUser.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during signup" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password || email === "" || password === "") {
		return res.status(400).json({ message: "All fields are required" });
	}
	try {
		const validUser = await User.findOne({ email: email });
		if (!validUser) {
			return res.status(400).json({ message: "User not found" });
		}

		const validPassword = await validUser.comparePassword(password);
		if (!validPassword) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid password" });
		}

		const token = jwt.sign(
			{ id: validUser._id, isAdmin: validUser.isAdmin },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);
		const { password: pass, ...rest } = validUser._doc;
		res
			.status(200)
			.cookie("access_token", token, { httpOnly: true })
			.json({ ...rest, token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during login" });
	}
};

const google = async (req, res) => {
	const { email, name, googlePhotoUrl } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_SECRET
			);
			const { password, ...rest } = user._doc;
			res
				.status(200)
				.cookie("access_token", token, { httpOnly: true })
				.json(rest);
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const newUser = new User({
				username:
					name.toLowerCase().split(" ").join("") +
					Math.random().toString(9).slice(-4),
				email,
				password: generatedPassword,
				profilePicture: googlePhotoUrl,
			});
			await newUser.save();
			const token = jwt.sign(
				{ id: newUser._id, isAdmin: newUser.isAdmin },
				process.env.JWT_SECRET
			);
			const { password, ...rest } = newUser._doc;
			res
				.status(200)
				.cookie("access_token", token, { httpOnly: true })
				.json(rest);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during Google login" });
	}
};

const updateUser = async (req, res) => {
	if (req.user.id !== req.params.userId) {
		return res
			.status(403)
			.json({ message: "You are not allowed to update this user" });
	}

	if (req.body.username) {
		if (req.body.username.length < 7 || req.body.username.length > 20) {
			return res
				.status(400)
				.json({ message: "Username must be between 7 and 20 characters" });
		}
		if (req.body.username.includes(" ")) {
			return res
				.status(400)
				.json({ message: "Username cannot contain spaces" });
		}
		if (req.body.username !== req.body.username.toLowerCase()) {
			return res.status(400).json({ message: "Username must be lowercase" });
		}
		if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
			return res
				.status(400)
				.json({ message: "Username can only contain letters and numbers" });
		}
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					profilePicture: req.body.profilePicture,
					password: req.body.password,
				},
			},
			{ new: true }
		);
		const { password, ...rest } = updatedUser._doc;
		res.status(200).json(rest);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during user update" });
	}
};

const deleteUser = async (req, res) => {
	if (!req.user.isAdmin && req.user.id !== req.params.userId) {
		return res
			.status(403)
			.json({ message: "You are not allowed to delete this user" });
	}
	try {
		await User.findByIdAndDelete(req.params.userId);
		res.status(200).json("User has been deleted");
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during user deletion" });
	}
};

const signout = (req, res) => {
	try {
		res
			.clearCookie("access_token")
			.status(200)
			.json("User has been signed out");
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during signout" });
	}
};

const getUsers = async (req, res) => {
	if (!req.user.isAdmin) {
		return res
			.status(403)
			.json({ message: "You are not allowed to see all users" });
	}
	try {
		const startIndex = parseInt(req.query.startIndex) || 0;
		const limit = parseInt(req.query.limit) || 9;
		const sortDirection = req.query.sort === "asc" ? 1 : -1;

		const users = await User.find()
			.sort({ createdAt: sortDirection })
			.skip(startIndex)
			.limit(limit);

		const usersWithoutPassword = users.map(user => {
			const { password, ...rest } = user._doc;
			return rest;
		});

		const totalUsers = await User.countDocuments();

		const now = new Date();
		const oneMonthAgo = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		);
		const lastMonthUsers = await User.countDocuments({
			createdAt: { $gte: oneMonthAgo },
		});

		res.status(200).json({
			users: usersWithoutPassword,
			totalUsers,
			lastMonthUsers,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during fetching users" });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const { password, ...rest } = user._doc;
		res.status(200).json(rest);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error during fetching user" });
	}
};

module.exports = {
	signup,
	login,
	google,
	updateUser,
	signout,
	getUsers,
	getUser,
	deleteUser,
};
