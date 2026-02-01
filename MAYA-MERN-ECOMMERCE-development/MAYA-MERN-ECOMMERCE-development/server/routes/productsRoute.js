const express = require('express');
const router = express.Router();
const productsModel = require('../models/productsModel')

router.get('/getAllProducts', async (req, res) => {
  try {
    const docs = await productsModel.find({});
    res.send(docs);
  } catch (err) {
    const error = res.status(400).json({ message: "Something went wrong" });
    throw error;
  }
});

router.post("/getProductById", async (req, res) => {
  try {
    const doc = await productsModel.find({ _id: req.body.productById });
    res.send(doc[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
})

router.post("/addReview", async (req, res) => {
  try {

    const { productId, review } = req.body;
    if (!productId || !review) {
      return res.status(400).json({ message: "Missing productId or review" });
    }

    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if(product.reviews.length === 0){
      product.rating = review.rating;
    } else {
    product.reviews.push(review);
    product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;
    }

    await productsModel.updateOne(
      { _id: productId },
      { $push: { reviews: review } }
    );

    res.status(200).json({ message: "Review submitted successfully" });
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;

