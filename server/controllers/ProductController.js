import slugify from "slugify";
import fs from "fs";
import ProductModel from "../models/ProductModel.js";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();

// Initialize Braintree payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use sandbox environment for testing
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Controller for processing Braintree payments
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body; // Payment nonce and cart items from request body
    let total = 0;

    // Calculate total amount from cart items
    cart.map((i) => {
      total += i.price;
    });

    // Create a new transaction with Braintree
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce, // Payment nonce from frontend
        options: {
          submitForSettlement: true, // Automatically submit for settlement
        },
      },
      function (error, result) {
        if (result) {
          // Save order details in the database
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          // Send error response if transaction fails
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Controller for generating Braintree client token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (error, response) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(response); // Send generated token to frontend
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Controller for adding a new product
export const addProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields; // Product details from request fields
    const { photo } = req.files; // Product photo from request files

    // Validation checks
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });

      case !description:
        return res.status(500).send({ error: "Description is Required" });

      case !price:
        return res.status(500).send({ error: "Price is Required" });

      case !category:
        return res.status(500).send({ error: "Category is Required" });

      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });

      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is Required and should be less than 1mb",
        });
    }

    // Create new product with slugified name
    const products = new ProductModel({ ...req.fields, slug: slugify(name) });

    // If a photo is provided, read its data and set content type
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    // Save the new product to the database
    await products.save();
    res.status(201).send({
      success: "true",
      message: "Product Added Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Adding Product",
      error: error.message,
    });
  }
};

// Controller for fetching all products
export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category") // Populate category field
      .limit(12) // Limit results to 12 products
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error: error.message,
    });
  }
};

// Controller for fetching a single product by slug
export const getOneProductController = async (req, res) => {
  try {
    const products = await ProductModel.findOne({
      slug: req.params.slug, // Find product by slug from URL params
    }).populate("category"); // Populate category field
    res.status(200).send({ success: true, message: "products", products });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error: error.message,
    });
  }
};

// Controller for fetching product photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo"); // Find product by ID and select photo field

    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType); // Set content type for photo
      return res.status(200).send(product.photo.data); // Send photo data
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Photo",
      error: error.message,
    });
  }
};

// Controller for deleting a product
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params; // Product ID from URL params
    const products = await ProductModel.findByIdAndDelete(pid); // Delete product by ID
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Photo",
      error: error.message,
    });
  }
};

// Controller for updating a product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields; // Updated product details from request fields
    const { photo } = req.files; // Updated photo from request files

    // Validation checks
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than 1mb" });
    }

    // Find and update the product by ID
    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true } // Return the updated product
    );

    // If a photo is provided, read its data and set content type
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save(); // Save updated product

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating the product",
      error,
    });
  }
};

// Controller for filtering products
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Apply category filter
    if (checked.length > 0) args.category = checked;

    // Apply price range filter
    if (radio.length === 2) {
      args.price = { $gte: parseInt(radio[0]), $lte: parseInt(radio[1]) };
    }

    const products = await ProductModel.find(args); // Find products based on filters
    res.status(200).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// Controller for getting total product count
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount(); // Get total count of products
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "error in product count", success: false, error });
  }
};

// Controller for getting products per page
export const productListController = async (req, res) => {
  try {
    const perPage = 6; // Number of products per page
    const page = req.params.page ? req.params.page : 1; // Current page number
    const products = await ProductModel.find({})
      .select("photo") // Select only photo field
      .skip((page - 1) * perPage) // Skip products for previous pages
      .limit(perPage) // Limit results to perPage number
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "error in per page ctrl", error });
  }
};

// Controller for searching products by keyword
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params; // Search keyword from URL params
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Match name with keyword
        { description: { $regex: keyword, $options: "i" } }, // Match description with keyword
      ],
    }).select("-photo"); // Exclude photo field from results
    res.json(results);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "Error in Search Product Api", error });
  }
};

// Controller for getting related products based on category
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params; // Product ID and category ID from URL params
    const products = await ProductModel.find({
      category: cid, // Find products in the same category
      _id: { $ne: pid }, // Exclude the current product
    })
      .select("-photo") // Exclude photo field from results
      .limit(3) // Limit results to 3 products
      .populate("category"); // Populate category field
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while getting related products",
      error,
    });
  }
};
