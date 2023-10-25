const router = require("express").Router();
const { request } = require("express");
let Salary = require("../models/salaryModel")


//add salary
//http://localhost:8020/salary/add
router.route("/add").post((req,res)=>{
    const employee_id = req.body.employee_id;
    const employee_name = req.body.employee_name;
    const basic_salary = req.body.basic_salary;
    const allowance = req.body.allowance;
    const paid_date = req.body.paid_date;


    const newSalary = new Salary({
        employee_id,
        employee_name,
        basic_salary,
        allowance,
        paid_date,
        

    })

    newSalary.save().then(()=>{
        res.json("Salary Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//fetch salary
//http://localhost:8020/salary/
router.route("/").get((req,res)=>{
    Salary.find().then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err)
    })
})

//update salary
//http://localhost:8090/salary/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let salaryId = req.params.id;
    const {employee_id,employee_name,basic_salary,allowance,paid_date} = req.body;

    const updateSalary = {
        employee_id,
        employee_name,
        basic_salary,
        allowance,
        paid_date

    }

    const update = await Salary.findByIdAndUpdate(salaryId,updateSalary).then(()=>{
        res.status(200).send({status: "Salary Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let salary = await Salary.findById(req.params.id);
    const data = {
        employee_id: req.body.employee_id || item.employee_id,
        employee_name: req.body.employee_name || item.employee_name,
        basic_salary: req.body.basic_salary || item.basic_salary,
        allowance: req.body.allowance || item.allowance,
        paid_date: req.body.paid_date || item.paid_date

    };
    salary = await Salary.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(salary);
});

//delete salary
//http://localhost:8020/salary/delete/:id
router.route("/delete/:id").delete(async (req, res)=>{
    let salaryId = req.params.id;

    await Salary.findByIdAndDelete(salaryId).then(()=>{
        res.status(200).send({status: "Salary deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//get one salary
//http://localhost:8020/salary/get/:id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Salary.findById(id).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;