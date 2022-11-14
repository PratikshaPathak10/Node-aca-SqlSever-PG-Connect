var config = require('./dbconfig');
const sql = require('mssql');


async function getCustomers() {
    try {
        let pool = await sql.connect(config);
        let customers = await pool.request().query("SELECT * from customers");
        return customers.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getCustomer(customerId) {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input('input_parameter', sql.Int, customerId)
            .query("SELECT * from customers where Id = @input_parameter");
        return customer.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function addCustomer(customer) {

    try {
        let pool = await sql.connect(config);
        //this is also remaining to change 
        let insertCustomer = await pool.request().query("Insert into EmployeeInfo (EmpName,Salary,DeptName,Designation) values ('T.M. Sabnis',13000,'Accounts','Lead')");

        //Throught SP insert - //THis is remaining - need to create SP
        // let insertCustomer = await pool.request()
        //     .input('Id', sql.Int, customer.Id)
        //     .input('Title', sql.NVarChar, customer.Title)
        //     .input('Quantity', sql.Int, customer.Quantity)
        //     .input('Message', sql.NVarChar, customer.Message)
        //     .input('City', sql.NVarChar, customer.City)
        //     .execute('InsertOrders');
        return insertCustomer.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}






module.exports = {
    getCustomers: getCustomers,
    getCustomer : getCustomer,
    addCustomer : addCustomer
}