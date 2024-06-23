import axios from 'axios';

// Function to get product details from the provider
const getProduct = async (baseUrl, productId) => {
  const response = await axios.get(`${baseUrl}/product/${productId}`); // Make a GET request to the /product/:id endpoint
  return response.data; // Return the response data
};

export { getProduct }; // Export the function for use in the test
