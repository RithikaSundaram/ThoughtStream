const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const commentController = require("../controllers/commentController");

router.post("/createComment", auth, commentController.createComment);
router.get("/getPostComments/:postId", commentController.getPostComments);
router.put("/likeComment/:commentId", auth, commentController.likeComment);
router.put("/editComment/:commentId", auth, commentController.editComment);
router.delete(
	"/deleteComment/:commentId",
	auth,
	commentController.deleteComment
);
router.get("/getcomments", auth, commentController.getcomments);

module.exports = router;
