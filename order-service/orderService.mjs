import express from 'express';
import axios from 'axios';
import orders from './orders.json'; // Simulated database

const app = express();
const port = 8080; // The port on which the consumer service will run

// Define the /order endpoint to create an order
app.post('/order', express.json(), async (req, res) => {
  const { productId } = req.body;
  try {
    // Call the product service to get product details
    const productResponse = await axios.get(`http://localhost:8081/product/${productId}`);
    const product = productResponse.data;

    // Create a new order
    const order = {
      id: orders.length + 1,
      product: product,
      quantity: 1
    };
    orders.push(order);
    res.status(201).json(order); // Respond with the created order
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the order service
app.listen(port, () => {
  console.log(`Order service running on http://localhost:${port}`); // Log the URL of the running service
});
