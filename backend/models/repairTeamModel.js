const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repairTeamSchema = new Schema({
    team_name : {
        type : String,
        required: false
    },
    specialization : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    NoOfPeople : {
        type : Number,
        required: true
    },
    hourPrice : {
        type : String,
        required: true
    },
    contact : {
        type : String,
        required: false
    },
})

//salary table and path
const RepairTeam = mongoose.model("repairTeam",repairTeamSchema);
module.exports = RepairTeam;