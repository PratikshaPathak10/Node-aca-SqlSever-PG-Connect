var Db  = require('./dboperations');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);


router.route('/customers').get((request,response)=>{

    dboperations.getCustomers().then(result => {
       response.json(result[0]);
    })

})

router.route('/customers/:customerId').get((request,response)=>{

    dboperations.getCustomer(request.params.customerId).then(result => {
       response.json(result[0]);
    })

})

router.route('/customers').post((request,response)=>{

    let customer = {...request.body}

    dboperations.addCustomer(customer).then(result => {
       response.status(201).json(result);
    })

})




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Customer API is runnning at ' + port);



