import { Pact } from '@pact-foundation/pact';
import { resolve } from 'path';
import { expect } from 'chai';
import { getProduct } from '../consumerClient.mjs';

const MOCK_SERVER_PORT = 1234;

// Set up a Pact provider for the mock server
const provider = new Pact({
  consumer: 'OrderService', // The name of the consumer
  provider: 'ProductService', // The name of the provider
  port: MOCK_SERVER_PORT, // The port on which the mock provider will run
  log: resolve(process.cwd(), 'logs', 'pact.log'), // Log file path
  dir: resolve(process.cwd(), 'pacts'), // Directory to save the pact files
  logLevel: 'INFO', // Logging level
  spec: 2, // Pact specification version,
});

describe('Pact with ProductService', () => {
  // Start the mock provider before running the tests
  before(() => provider.setup());

  describe('when a call to /product/1 is made', () => {
    // Define the interaction (contract) between the consumer and the provider
    before(() => {
      return provider.addInteraction({
        state: 'product with ID 1 exists', // Provider state for the test
        uponReceiving: 'a request for product 1', // Description of the request
        withRequest: {
          method: 'GET', // HTTP method
          path: '/product/1' // Endpoint
        },
        willRespondWith: {
          status: 200, // Expected status code
          body: {
            id: 1,
            name: 'Laptop',
            price: 999.99
          } // Expected response body
        }
      });
    });

    // Test to verify the interaction
    it('should return the correct product details', async () => {
      
      // Call the mock server, which runs on http://localhost:1234
      const response = await axios.get(`http://localhost:${MOCK_SERVER_PORT}/product/${1}`); // Make a GET request to the /product/:id endpoint

      // Verify the response from the mock server matches the expected body
      expect(response.data).to.deep.equal({ id: 1, name: 'Laptop', price: 999.99 });
    });

    // Verify that all interactions specified in the pact have been met
    afterEach(() => provider.verify());

    // Finalize the mock provider after running the tests
    after(() => provider.finalize());
  });
});
