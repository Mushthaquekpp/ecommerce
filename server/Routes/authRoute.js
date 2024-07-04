import express, { Router } from "express";

import {
  regController,
  logController,
  testController,
  forgetPasswordController,
  updateProfileController,
  orderStatusController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/register", regController);
route.post("/login", logController);
route.get("/test", requireSignIn, isAdmin, testController);
route.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
route.get("/admin-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

route.post("/forgot-password", forgetPasswordController);

route.put("/profile", requireSignIn, updateProfileController);

//orders

route.get("/orders", requireSignIn, orderStatusController);
export default route;
