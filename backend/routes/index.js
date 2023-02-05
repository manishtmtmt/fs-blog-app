const { Router } = require("express");

const {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getFeaturedPosts,
  getPosts,
  searchPost,
  getRelatedPosts,
  uploadImage,
} = require("../controllers");
const parseData = require("../middlewares");
const multer = require("../middlewares/multer");
const { postValidator, validate } = require("../middlewares/postValidator");

const router = Router();

router.post(
  "/create",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  createPost
);

router.put(
  "/:postId",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  updatePost
);

router.get("/single/:slug", getPost);

router.get("/featured-posts", getFeaturedPosts);

router.delete("/:postId", deletePost);

router.get("/posts", getPosts);

router.get("/search", searchPost);

router.get("/related-post/:postId", getRelatedPosts);

router.post("/upload-image", multer.single("image"), uploadImage);

module.exports = router;