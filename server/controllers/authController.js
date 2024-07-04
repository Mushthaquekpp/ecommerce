import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

export const regController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body; //data passed to body
    if (!name) {
      return res.send({ error: "name is required" }); //checking validation
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
    if (!answer) {
      return res.send({ error: "answer field is required" });
    }

    const existUser = await userModel.findOne({ email }); //checking if the data is registered earlier
    if (existUser) {
      return res.send({ message: "Email is already registered" });
    }

    const hpassword = await hashPassword(password); //calling the hashpassword function
    const user = await new userModel({
      name,
      email,
      password: hpassword,
      phone,
      address,
      answer,
    }).save();
    res
      .status(201)
      .send({ success: true, message: "registered success", user }); //saving the entered data and hashing the password
  } catch (error) {
    res.status(500).send({ success: false, message: "error" });
    console.log(error);
  }
};

export const logController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email or password" }); //checking validation
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ success: false, message: "Email is not registered" });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return response
        .status(200)
        .send({ success: false, message: "Invalid Password" });
    }
    //token creating
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
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
    console.log(error);
    res.status(500).send({
      success: false,
      message: "login error",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("test passed");
};

export const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!answer) {
      return res.send({ error: "answer field is required" });
    }
    if (!newPassword) {
      return res.send({ error: " new password field is required" });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "wrong email or password" });
    }

    const npassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: npassword });
    res
      .status(204)
      .send({ success: true, message: "password changed successfully" });
  } catch (error) {
    console.log(error);
  }
};

//profile update
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    //password

    if (password && password.length < 8) {
      return res.json({
        error: "password is required and must be atleast 8 characters",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,

        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "something went wrong" });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating orders",
      error,
    });
  }
};
