Command line explaination :-

```bash
    npm install
```

This command starts the Pact Broker in a Docker container, accessible at http://localhost:9292.
```bash
    docker-compose up -d
```


```plaintext
    ecommerce/
    ├── product-service/
    │   ├── productService.js
    │   ├── products.json
    │   └── test/
    │       └── providerPactTest.js
    ├── order-service/
    │   ├── orderService.js
    │   ├── consumerClient.js
    │   ├── orders.json
    │   └── test/
    │       └── consumerPactTest.js
    └── pacts/
```

This command starts the product service on port 8081.
```bash
    node product-service/productService.js
```

This command runs the consumer tests, generating Pact files based on the interactions.
```bash
    mocha order-service/test/consumerPactTest.js
```

This command publishes the generated Pact files to the Pact Broker.
```bash
    node publishPacts.js
```

This command fetches the Pact files from the Pact Broker and verifies them against the running Product Service.
```bash
    mocha product-service/test/providerPactTest.js
```

```json
"scripts": {
  "start-product": "node product-service/productService.js",
  "start-order": "node order-service/orderService.js",
  "test-consumer": "mocha order-service/test/consumerPactTest.js",
  "test-provider": "mocha product-service/test/providerPactTest.js",
  "publish-pacts": "node publishPacts.js"
}
```

```bash
    npm run start-product        # Start the Product Service
    npm run start-order          # Start the Order Service
    npm run test-consumer        # Run Consumer Pact Tests
    npm run publish-pacts        # [Optional] Publish Pacts to Broker only if Broker server is running
    npm run test-provider        # Run Provider Verification Tests
```