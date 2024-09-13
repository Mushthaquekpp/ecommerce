import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to verify JWT and set the user in the request object
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; // Attach user details to request object
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access, invalid token",
    });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user?.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }
    next(); // Allow admin to proceed
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
