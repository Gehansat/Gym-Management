const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
    
    Id : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    type : {
        type : String,
        required : true
    },
    YOM : {
        type : String,
        required : true
    },
    dimension : {
        type: String,
        required: true
    },
    last_service_date : {
        type : String,
        required : true
    },
    next_service_date : {
        type: String,
        required: true
    }

})

//equipment table and path
const Equipment = mongoose.model("equipment",EquipmentSchema);
module.exports = Equipment;