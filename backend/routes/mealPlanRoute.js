const router = require("express").Router();
const { request } = require("express");
let  MealPlan = require("../models/mealPlanModel")


//add mealPlan
//http://localhost:8020/meal/add
router.route("/add").post((req,res)=>{
    const empId = req.body.empId;
    const age = req.body.age;
    const gender = req.body.gender;
    const weight = req.body.weight;
    const height = req.body.height;
    const dietTemplate = req.body.dietTemplate;
    const healtLabel = req.body.healtLabel;
    const dailyMeals = req.body.dailyMeals;


    const newMealPlan = new MealPlan({
        empId,
        age,
        gender,
        weight,
        height,
        dietTemplate,
        healtLabel,
        dailyMeals

    })

    newMealPlan.save().then(()=>{
        res.json("MealPlan Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//fetch meal plans
//http://localhost:8020/meal/
router.route("/").get((req,res)=>{
    MealPlan.find().then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err)
    })
})

//update MealPlan
//http://localhost:8090/meal/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let mealPlanId = req.params.id;
    const {empId,age,gender,weight,height,dietTemplate,healtLabel,dailyMeals} = req.body;

    const updateMealPlan = {
        empId,
        age,
        gender,
        weight,
        height,
        dietTemplate,
        healtLabel,
        dailyMeals

    }

    const update = await MealPlan.findByIdAndUpdate(mealPlanId,updateMealPlan).then(()=>{
        res.status(200).send({status: "Meal Plan Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let mealPlan = await MealPlan.findById(req.params.id);
    const data = {
        empId: req.body.empId || MealPlan.empId,
        age: req.body.age || MealPlan.age,
        gender: req.body.gender || MealPlan.gender,
        weight: req.body.weight || MealPlan.weight,
        height: req.body.height || MealPlan.height,
        dietTemplate: req.body.dietTemplate || MealPlan.dietTemplate,
        healtLabel: req.body.healtLabel || MealPlan.healtLabel,
        dailyMeals: req.body.dailyMeals || MealPlan.dailyMeals

    };
    mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(mealPlan);
});

//delete meal plan
//http://localhost:8020/meal/delete/:id
router.route("/delete/:id").delete(async (req, res)=>{
    let mealPlanId = req.params.id;

    await MealPlan.findByIdAndDelete(mealPlanId).then(()=>{
        res.status(200).send({status: "MealPlan deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//get one of the Item
//http://localhost:8020/meal/get/:id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    MealPlan.findById(id).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;