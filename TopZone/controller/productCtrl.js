const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');


const createProduct = asyncHandler(async (req, res) => {
   try {
      if (req.body.title) {
         req.body.slug = slugify(req.body.title);
      }
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
   } catch (error) {
      throw new Error(error);
   }
});

const updateProduct = asyncHandler(async (req, res) => {
   const { id } = req.params;
   try {
      if (req.body.title) {
         req.body.slug = slugify(req.body.title);
      }
      const updatedProduct = await Product.findOneAndUpdate(id, req.body, {
         new: true,
      });
      console.log(updatedProduct);
      res.json(updatedProduct);
   } catch (error) {
      throw new Error(error);
   }
});

const deleteProduct = asyncHandler(async (req, res) => {
   const { id } = req.params;
   try {
      const deletedProduct = await Product.findOneAndDelete(id);
      console.log(deletedProduct);
      res.json(deletedProduct);
   } catch (error) {
      throw new Error(error);
   }
});

const getaProduct = asyncHandler(async (req, res) => {
   const { id } = req.params;
   try {
      const findProduct = await Product.findById(id);
      res.json(findProduct);
   } catch (error) {
      throw new Error(error);
   }
})

const getAllProduct = asyncHandler(async (req, res) => {
   try {
      const queryObj = { ...req.query };
      const excludeFields = ["page","sort","limit","fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      console.log(queryObj);
      let queryStr = JSON.stringify(queryObj);
      queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      
      const query = Product.find (JSON.parse(queryStr));
      const product = await query;
      res.json(product);
   } catch (error) {
      throw new Error(error);
   }
});
module.exports = { deleteProduct, updateProduct, getAllProduct, createProduct, getaProduct };