const router = require("express").Router();
const { request } = require("express");
let  RepairTeam = require("../models/repairTeamModel")


//add repair team
//http://localhost:8020/repair/add
router.route("/add").post((req,res)=>{
    const team_name = req.body.team_name;
    const specialization  = req.body.specialization ;
    const description = req.body.description;
    const NoOfPeople = req.body.NoOfPeople;
    const hourPrice = req.body.hourPrice;
    const contact = req.body.contact;


    const newTeam = new RepairTeam({
        team_name,
        specialization ,
        description,
        NoOfPeople,
        hourPrice,
        contact

    })

    newTeam.save().then(()=>{
        res.json("Repair Team Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//fetch team
//http://localhost:8020/repair/
router.route("/").get((req,res)=>{
    RepairTeam.find().then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err)
    })
})

//update team
//http://localhost:8020/repair/:id
router.route("/update/:id").put(async (req,res)=>{
    let teamId = req.params.id;
    const {team_name,specialization ,description,NoOfPeople,hourPrice,contact} = req.body;

    const updatePayment = {
        team_name,
        specialization,
        description,
        NoOfPeople,
        hourPrice,
        contact

    }

    const update = await RepairTeam.findByIdAndUpdate(teamId,updatePayment).then(()=>{
        res.status(200).send({status: "Team Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let team = await RepairTeam.findById(req.params.id);
    const data = {
        team_name: req.body.team_name || team.team_name,
        specialization: req.body.specialization || team.specialization,
        description: req.body.description || team.description,
        NoOfPeople: req.body.NoOfPeople || team.NoOfPeople,
        hourPrice: req.body.hourPrice || team.hourPrice,
        contact: req.body.contact || team.contact

    };
    team = await RepairTeam.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(team);
});

//delete team
//http://localhost:8020/repair/delete/:id
router.route("/delete/:id").delete(async (req, res)=>{
    let id = req.params.id;

    await RepairTeam.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status: "Repair Team deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//get one of the Item
//http://localhost:8020/repair/get/:id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    RepairTeam.findById(id).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;