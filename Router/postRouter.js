import express from "express";
import {
  getPosts,
  createPost,
  editPost,
  deletePost,
} from "../controllers/index.js";
import verifyToken from "./verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);

export default router;
