// const express = require("express");
// const userController = require("../controllers/userController");
// const auth = require("../middlewares/auth");
// const router = express.Router();

// router.post("/signup", userController.signup);
// router.post("/login", userController.login);
// router.post("/google", userController.google);
// router.put("/update/:userId", auth, userController.updateUser);
// router.delete("/delete/:userId", auth, userController.deleteUser);
// router.post("/signout", userController.signout);
// router.get("/getusers", auth, userController.getUsers);
// router.get("/:userId", userController.getUser);

// module.exports = router;

const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

// Route for user registration
router.post("/signup", async (req, res) => {
	try {
		await userController.signup(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during signup" });
	}
});

// Route for user login
router.post("/login", async (req, res) => {
	try {
		await userController.login(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during login" });
	}
});

// Route for Google authentication
router.post("/google", async (req, res) => {
	try {
		await userController.google(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during Google login" });
	}
});

// Route for updating user profile (requires authentication)
router.put("/update/:userId", auth, async (req, res) => {
	try {
		await userController.updateUser(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during user update" });
	}
});

// Route for deleting a user (requires authentication)
router.delete("/delete/:userId", auth, async (req, res) => {
	try {
		await userController.deleteUser(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during user deletion" });
	}
});

// Route for user signout
router.post("/signout", async (req, res) => {
	try {
		await userController.signout(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during signout" });
	}
});

// Route for fetching all users (requires authentication)
router.get("/getusers", auth, async (req, res) => {
	try {
		await userController.getUsers(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during fetching users" });
	}
});

// Route for fetching a single user by ID
router.get("/:userId", async (req, res) => {
	try {
		await userController.getUser(req, res);
	} catch (err) {
		res.status(500).json({ message: "Server error during fetching user" });
	}
});

module.exports = router;
