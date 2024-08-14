const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");

router.post("/createposts", auth, postController.createpost);
router.get("/getposts", postController.getposts);
router.put("/updatepost/:id", auth, postController.updatepost);
router.delete("/deletepost/:id", auth, postController.deletepost);

module.exports = router;
