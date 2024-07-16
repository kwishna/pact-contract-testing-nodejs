import express from 'express';
import products from './products.json'; // Simulated database

const app = express();
const port = 8081; // The port on which the provider service will run

// Define the /product/:id endpoint
app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product); // Respond with the product details
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the provider service
app.listen(port, () => {
  console.log(`Product service running on http://localhost:${port}`); // Log the URL of the running service
});
