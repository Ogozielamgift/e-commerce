const express = require("express");
const { createNewProduct } = require("../controller/product");
const Product = require("../schema/Product");
const router = express.Router();
router.post("/", createNewProduct);
router.get("/", async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    res.json({
      product,
    });
  } catch (error) {
    res.json({
      message: "failed to fetch product",
    });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(608).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Successful",
      product,
    });
  } catch (error) {
    res.status(404).json({
      message: "error",
      error,
    });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params; //where to pass your parameters and request.body
  // const {isAdmin}=req.body
  const { quantity, variety } = req.body;
  try {
    const updateData = await Product.findByIdAndUpdate(id);
    if (!updateData) {
      res.status(708).json({
        message: "Content not found",
      });
    }
    const uploadImages = await Promise.all(
      img.map(async (img) => {
        const result = await cloudinary.uploader.upload(img, {
          folder: "products", //optional:store images in a specific folder in Cloudinary
          fileName: `${req.body.name}.jpg`,
        });
        return {
          url: result.secure_url,
        };
      })
    );
    updateData.quantity = quantity || updateData.quantity;
    updateData.variety = variety || updateData.variety;
    updateData.img = uploadImages || updateData.img;
    await updateData.save();
    res.status(200).json({
      message: "Update successful",
      updateData,
    });
  } catch (error) {
    res.status(404).json({
      message: "unable to update",
      error,
    });
  }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params; //to pass id as parameter
    try {
      const deleteRequest = await Product.findByIdAndDelete(id);
      if (!deleteRequest) {
        res.status(901).json({
          message: "content not found",
        });
      }
      res.status(300).json({
        message: "Delete successful",
      });
    } catch (error) {
      res.status(404).json({
        message: "unable to delete",
        error,
      });
    }
  });


module.exports = router;
