// routes/adminRoutes.js
import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply `requireSignIn` and `isAdmin` middleware to admin routes
router.get("/users", requireSignIn, isAdmin, getUsers);
router.get("/users/:id", requireSignIn, isAdmin, getUser);
router.put("/users/:id", requireSignIn, isAdmin, updateUser);
router.delete("/users/:id", requireSignIn, isAdmin, deleteUser);

export default router;
