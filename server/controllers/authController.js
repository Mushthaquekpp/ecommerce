import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

// Controller for user registration
export const regController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body; // Extracting data from request body

    // Validation checks
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone number is required" });
    }
    if (!address) {
      return res.send({ error: "address field is required" });
    }

    // Check if user with the given email already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.send({ message: "Email is already registered" });
    }

    // Hash the password before saving
    const hpassword = await hashPassword(password);

    // Create and save the new user
    const user = await new userModel({
      name,
      email,
      password: hpassword,
      phone,
      address,
    }).save();

    // Send success response
    res
      .status(201)
      .send({ success: true, message: "registered success", user });
  } catch (error) {
    // Handle any errors
    res.status(500).send({ success: false, message: "error" });
    console.log(error);
  }
};

// Controller for user login
export const logController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation checks
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email or password" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ success: false, message: "Email is not registered" });
    }

    // Compare password with the hashed password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid Password" });
    }

    // Generate JWT token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send success response with user details and token
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).send({
      success: false,
      message: "login error",
      error,
    });
  }
};

// Controller for testing API
export const testController = (req, res) => {
  res.send("test passed");
};

// Controller for handling password reset
export const forgetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validation checks
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!newPassword) {
      return res.send({ error: " new password field is required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "wrong email or password" });
    }

    // Hash the new password and update user
    const npassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: npassword });

    // Send success response
    res
      .status(204)
      .send({ success: true, message: "password changed successfully" });
  } catch (error) {
    // Handle any errors
    console.log(error);
  }
};

// Controller for updating user profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // Validation checks for password
    if (password && password.length < 8) {
      return res.json({
        error: "password is required and must be at least 8 characters",
      });
    }

    // Hash the new password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true } // Return the updated user
    );

    // Send success response with updated user details
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).send({ success: false, message: "something went wrong" });
  }
};

// Controller for updating order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Update order status
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated order
    );

    // Send response with updated order details
    res.json(orders);
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating orders",
      error,
    });
  }
};
