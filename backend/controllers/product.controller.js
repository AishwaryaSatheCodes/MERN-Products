import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Products not found - getall" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Empty fields." });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in create", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
  try {
    await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server problem." });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Object does not exist" });
  }
};
