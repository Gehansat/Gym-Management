const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
    empId : {
        type : String,
        required: false
    },
    age : {
        type : Number,
        required: true
    },
    gender: {
        type : String,
        required: true
    },
    weight: {
        type : String,
        required: true
    },
    height: {
        type : String,
        required: true
    },
    dietTemplate : {
        type : String,
        required: true
    },
    healtLabel : {
        type : String,
        required: true
    },
    dailyMeals : {
        type : String,
        required: true
    }
   
})

//meal plan table and path
const MealPlan = mongoose.model("mealPlan",MealPlanSchema);
module.exports = MealPlan;