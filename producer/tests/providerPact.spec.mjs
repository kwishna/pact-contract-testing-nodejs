import { Verifier } from '@pact-foundation/pact';
import { resolve } from 'path';

describe('Pact Verification', () => {
  it('should validate the expectations of the consumer', () => {
    const opts = {
      provider: 'ProductService', // The name of the provider
      providerBaseUrl: 'http://localhost:8081', // Base URL of the running provider service
    //   pactBrokerUrl: 'http://localhost:9292', // URL of the Pact Broker if brokeer server is started.
      pactUrls: [resolve('./pacts/orderService-productService.json')], // Path to the pact file if no broker server is running
      publishVerificationResult: true, // Whether to publish the results to the Pact Broker
      providerVersion: '1.0.0' // The version of the provider,
    };

    return new Verifier(opts).verifyProvider().then(output => {
      console.log('Pact Verification Complete!'); // Log completion message
      console.log(output); // Log detailed output of the verification
    });
  });
});

