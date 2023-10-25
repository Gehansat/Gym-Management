const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    employee_id : {
        type : String,
        required: true
    },
    employee_name : {
        type : String,
        required: true
    },
    basic_salary : {
        type : Number,
        required : true
    },
    allowance : {
        type : Number,
        required : true
    },
    paid_date : {
        type: String,
        required: true
    }

})

//salary table and path
const Salary = mongoose.model("salary",SalarySchema);
module.exports = Salary;