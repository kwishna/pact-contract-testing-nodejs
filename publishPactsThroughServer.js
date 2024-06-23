const pact = require('@pact-foundation/pact-node');
const path = require('path');

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'http://localhost:9292',
  consumerVersion: '1.0.0' // You can use a versioning strategy that suits your workflow
};

pact.publishPacts(opts)
  .then(() => {
    console.log('Pacts successfully published!');
  })
  .catch(e => {
    console.error('Pact publishing failed: ', e);
  });
