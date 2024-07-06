//here we are using express server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const client = require('./client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//to expose rest call 
// which internally call gprc server function using GRPCCLIENT
app.get('/', (req, res) => {
    client.getAll(null, (err, data) => {
        if(!err){
            res.send(data.customers);
        }else{
            res.send(null)
        }
    }) 
})

app.post('/create', (req, res) => {
    const {name, age, address} = req.body; 
    
    client.create({age, name, address}, (err, data) => {
        if(err) throw err;

        console.log("Created Successfully");
        res.send({
            message: "Created Successfully",
            data
        })
    })
     
})

app.post('/update', () => {
    const {id, name, age, address} = req.body;
    const updatedCustomer = {
        id,
        name,
        age,
        address 
    } 

    client.update(updatedCustomer, (err, data) => {
        if(err) throw err;

        console.log("Updated Successfully");
        res.send({
            message: "Updated Successfully",
            data
        })
    })
})

app.post('/delete/:id', (req, res) => {
    client.delete(req.params.id, (err, data) => {
        client.update(updatedCustomer, (err, data) => {
            if(err) throw err;
    
            console.log("Updated Successfully");
            res.send({
                message: "Updated Successfully",
                data
            })
        })
    }) 
})

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
})