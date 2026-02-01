// server/routes/paymentRoute.js
const express = require("express");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/paymentModel");

const router = express.Router();

router.post("/checkout", async (req, res) => {
  const { token, user, cartItems, totalAmount } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalAmount || 100, // ✅ amount must be in paise (for INR)
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        payment_method_types: ["card"],
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (paymentIntent) {
      const order = new Order({
        userId: user._id,
        name: user.name,
        email: user.email,
        orderItems: cartItems,
        shippingAddress: {
          address: token.card.address_line1,
          city: token.card.address_city,
          zipcode: token.card.address_zip,
          country: token.card.address_country,
        },
        orderAmount: totalAmount,
        transactionId: paymentIntent.id,
        isDelivered: false,
      });

      await order.save();

      res.status(200).send("Order Placed Successfully...");
    } else {
      res.status(400).json({ message: "Payment failed..." });
    }
  } catch (error) {
    console.error("Error occurred while processing payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/userOrders', async (req, res) => {
  try {
    const userId = req.body.userId;
    const orders = await Order.find({ userId }); 
    res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: error.message });
  }
})
// ✅ THIS IS THE CRUCIAL LINE
module.exports = router;
