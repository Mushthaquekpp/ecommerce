import CategoryModel from "../models/CategoryModels.js";
import slugify from "slugify";

export const CreateCategoryController = {
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      console.log(req.body);
      if (!name) {
        return res.status(400).send({ error: "name is required" });
      }

      const existCategory = await CategoryModel.findOne({ name });
      if (existCategory) {
        return res.status(400).send({
          success: false,
          error: "Category name is already registered",
        });
      }

      const slug = slugify(name);
      const category = await CategoryModel.create({ name, slug });
      res
        .status(200)
        .send({ success: true, message: "New category created", category });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal server error" });
    }
  },
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};
export const getCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({ success: true, message: "success", category });
  } catch (error) {
    res.status(500).send({ success: false, message: "error" });
    console.log(error);
  }
};
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
      category,
    });
  } catch {
    res.status(500).send({ success: false, message: "error" });
    console.log(error);
  }
};
