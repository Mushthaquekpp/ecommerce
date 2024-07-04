import categoryModel from "../models/CategoryModels.js";
import productModel from "../models/ProductModel.js";

const categoryProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({ success: true, category, products });
  } catch (error) {
    console.log(error);
    res.status(400).status({
      success: false,
      error,
      message: "Error while getting products",
    });
  }
};
export default categoryProductController;
 