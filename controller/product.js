const asyncHandler = require("express-async-handler");
const Product = require("../schema/Product");
const cloudinary = require("../services/Cloudinary");

const createNewProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    discountPrice,
    desc,
    img,
    quantity,
    variety,
    category,
    brand,
  } = req.body;
  try {
    const productExist = await Product.findOne({
      name,
    });
    if (productExist) {
      res.status(506).json({
        message: "product already Exist",
      });
    }
    //upload img to cloudinary
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
    const newProduct = await Product.create({
      name,
      price,
      discountPrice,
      desc,
      img: uploadImages,
      quantity,
      variety,
      category,
      brand,
    });

    res.status(200).json({
      _id: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      discountPrice: newProduct.discountPrice,
      desc: newProduct.desc,
      img: newProduct.img,
      quantity: newProduct.quantity,
      variety: newProduct.variety,
      category: newProduct.category,
      brand: newProduct.brand,

      message: "sucessful",
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to create product",
      error,
    });
  }
});

// const getSingleContent = asyncHandler(async(req, res)=>{})
module.exports = {
  createNewProduct,
};
