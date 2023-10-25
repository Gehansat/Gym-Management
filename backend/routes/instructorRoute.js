const router = require("express").Router();
const { request } = require("express");
let  Instructor = require("../models/instructorModel")


//add instructor
//http://localhost:8020/instructor/add
router.route("/add").post((req,res)=>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const gender = req.body.gender;
    const email = req.body.email;
    const contact = req.body.contact;
    const password = req.body.password;


    const newInstructor = new  Instructor({
        first_name,
        last_name,
        age,
        gender,
        email,
        contact,
        password

    })

    newInstructor.save().then(()=>{
        res.json("Instructor Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//fetch instructors
//http://localhost:8020/instructor/
router.route("/").get((req,res)=>{
    Instructor.find().then((instructor)=>{
        res.json(instructor)
    }).catch((err)=>{
        console.log(err)
    })
})

//update instructor
//http://localhost:8090/instructor/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let instructorId = req.params.id;
    const {first_name,last_name,age,gender,email,contact,password} = req.body;
    const updateInstructor = {
        first_name,
        last_name,
        age,
        gender,
        email,
        contact,
        password

    }

    const update = await Instructor.findByIdAndUpdate(instructorId,updateInstructor).then(()=>{
        res.status(200).send({status: "Instructor Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let instructor = await Instructor.findById(req.params.id);
    const data = {
        first_name: req.body.first_name || instructor.first_name,
        last_name: req.body.last_name || instructor.last_name,
        age: req.body.age || instructor.age,
        gender: req.body.gender || instructor.gender,
        email: req.body.email || instructor.email,
        contact: req.body.contact || instructor.contact,
        password: req.body.password || instructor.password,

    };
    instructor = await Instructor.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(instructor);
});

//delete instructor
//http://localhost:8020/instructor/delete/:id
router.route("/delete/:id").delete(async (req, res)=>{
    let instructorId = req.params.id;

    await Instructor.findByIdAndDelete(instructorId).then(()=>{
        res.status(200).send({status: "Instructor deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//find one of the Instructor
//http://localhost:8020/instructor/get/:id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Instructor.findById(id).then((instructor)=>{
        res.json(instructor)
    }).catch((err)=>{
        console.log(err);
    })
})




//instructor login
//http://localhost:8020/instructor/login
router.route("/instructor-login").post((req, res) => {
    const password = req.body.password;
    Instructor.findOne({ email: req.body.email }).then(instructor => {
        // Check if instructor exists
        if (!instructor) {
            return res.status(404).json({email: "Email not found"});
        } else {
            // Check password
            if (password === instructor.password) {
                res.send(instructor);
                
            } else {
                return res.status(400).json({password: "Password incorrect"});
            }
        }
    });
});

module.exports = router;