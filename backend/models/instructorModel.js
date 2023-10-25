const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    first_name : {
        type : String,
        required: true
    },
    last_name : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required: true
    },
    contact : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
 

})

//instructor table and path
const Instructor = mongoose.model("instructor",InstructorSchema);
module.exports = Instructor;