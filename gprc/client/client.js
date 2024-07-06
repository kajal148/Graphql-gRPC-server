const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Resolve the path to your proto file
const PROTO_PATH = path.resolve(__dirname, '..', 'server', 'customers.proto');

// Load the proto file and create a client
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

// Load the entire package definition
const customerServiceProto = grpc.loadPackageDefinition(packageDefinition);

// Access the specific service within the package definition
const customerService = customerServiceProto.CustomerService;

// Create a new client instance for the service
const client = new customerService('127.0.0.1:30043', grpc.credentials.createInsecure());

module.exports = client;
