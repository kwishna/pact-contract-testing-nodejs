module.exports = {
    // Specify the directories containing test files
    spec: [
      'order-service/tests/**/*.mjs',
      'product-service/tests/**/*.mjs'
    ],
    // Use the 'spec' reporter for a detailed output of test results
    reporter: 'spec',
    // Set a timeout for tests (default is 2000ms)
    timeout: 5000,
    // Enable color output in the terminal
    color: true,
    // Require the chai assertion library globally
    // require: ['chai/register-assert', 'chai/register-expect', 'chai/register-should']
  };
  