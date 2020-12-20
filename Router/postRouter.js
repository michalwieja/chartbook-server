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
router.post("/", createPost);
router.patch("/:id", verifyToken, editPost);
router.delete("/:id", verifyToken, deletePost);

export default router;
