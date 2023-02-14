const { Router } = require("express");

const authentication = require("../../middlewares/authentication");

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
} = require("../../controllers/posts");
const parseData = require("../../middlewares");
const multer = require("../../middlewares/multer");
const { postValidator, validate } = require("../../middlewares/postValidator");

const router = Router();

router.post(
  "/create",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  authentication,
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
