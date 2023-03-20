const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbid');

const createCategory = asyncHandler(async ( req,res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }
});

const updateCategory = asyncHandler(async ( req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Category.findOneAndUpdate(id, req.body, {
            new: true,
         });
         console.log(updatedCategory);
         res.json(updatedProduct);
    } catch (error) {
        throw new Error(error)
    }
});

const deleteCategory = asyncHandler(async ( req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findOneAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error)
    }
});


const getaCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
       const findCategory = await Category.findById(id);
       res.json(findCategory);
    } catch (error) {
       throw new Error(error);
    }
 });

 const getallCategory = asyncHandler(async (req, res) => {
    try {
       const findAllCategory = await Category.find();
       res.json(findAllCategory);
    } catch (error) {
       throw new Error(error);
    }
 })
module.exports = { getallCategory,getaCategory,deleteCategory,updateCategory,createCategory};