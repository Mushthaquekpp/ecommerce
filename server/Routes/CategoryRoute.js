import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  CreateCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/CreateCategoryController.js";
const categoryRoute = express.Router();

categoryRoute.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController.createCategory
);
categoryRoute.put(
  "/edit-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
categoryRoute.get("/get-category", getCategoryController);

categoryRoute.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default categoryRoute;
