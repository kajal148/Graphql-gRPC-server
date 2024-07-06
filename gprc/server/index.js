// we'll create GRPC server
const path = require('path');
const PROTO_PATH = path.resolve(__dirname, 'customers.proto');

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String.apply,
    arrays: true
});

const customersProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server();

const customers = [{
    id: 'aa',
    name: 'Kajal',
    age: 22,
    address: 'Assam'
},{
    id: 'bb',
    name: 'Devang',
    age: 27,
    address: 'Uttar Pradesh'
}
]

server.addService(customersProto.CustomerService.service, {
    getAll: (call, callback) => {
        //context = null
        callback(null, { customers }) 
    },
    get: (call, callback) => {
        let customer = customer.find(cus => 
            cus.id === call.request.id
        )

        if(customer){
            callback(null, customer);
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
    insert: (call, callback) => {
        const {name, age, address} = call.request;

        const newCustomer = {
            id: customers.length + 1,
            name,
            age, 
            address
        }

        customers.push(newCustomer);

        callback(null, newCustomer);
    },
    update: (call, callback) => {
        let customer = customer.find(cus => 
            cus.id === call.request.id
        )

        if(customer){
            const {name, age, address} = call.request;

            customer.name = name;
            customer.age = age
            customer.address = address
            callback(null, customer);
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
    delete: (call, callback) => {
        let customerIndex = customer.findIndex(cus => 
            cus.id === call.request.id
        )

        if(customerIndex != -1){
            customers.splice(customerIndex, 1)
            callback(null, {});
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: "NOT Found"
            })
        }
    }
});

server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(),  (err, port) => {
    if (err) {
        console.error('Bind failed:', err);
    } else {
        console.log(`Server running at http://127.0.0.1:${port}`);
        server.start();
    }
});