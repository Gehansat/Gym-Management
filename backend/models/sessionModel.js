const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    instructor_name : {
        type : String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    location : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required: true
    },
    start_time : {
        type : String,
        required: true
    },
    end_time : {
        type : String,
        required : true
    }

})

//session table and path
const Session = mongoose.model("Session",SessionSchema);
module.exports = Session;