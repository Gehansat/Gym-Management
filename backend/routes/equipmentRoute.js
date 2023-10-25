const router = require("express").Router();
const { request } = require("express");
let Equipment = require("../models/equipmentModel")


//add equipment
//http://localhost:8020/equipment/add
router.route("/add").post((req,res)=>{
    const Id = req.body.Id;
    const name = req.body.name;
    const type = req.body.type;
    const YOM = req.body.YOM;
    const dimension = req.body.dimension;
    const last_service_date = req.body.last_service_date;
    const next_service_date = req.body.next_service_date;


    const newEquipment = new Equipment({
        Id,
        name,
        type,
        YOM,
        dimension,
        last_service_date,
        next_service_date

    })

    newEquipment.save().then(()=>{
        res.json("Equipment Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//fetch equipments
//http://localhost:8020/equipment/
router.route("/").get((req,res)=>{
    Equipment.find().then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err)
    })
})

//update equipment
//http://localhost:8090/equipment/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let equipmentId = req.params.id;
    const {Id,name,type,YOM,dimension,last_service_date,next_service_date} = req.body;

    const updateEquipment = {
        Id,
        name,
        type,
        YOM,
        dimension,
        last_service_date,
        next_service_date

    }

    const update = await Equipment.findByIdAndUpdate(equipmentId,updateEquipment).then(()=>{
        res.status(200).send({status: "Equipment Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let equipment = await Equipment.findById(req.params.id);
    const data = {
        Id: req.body.Id || item.Id,
        name: req.body.name || item.name,
        type: req.body.type || item.type,
        YOM: req.body.YOM || item.YOM,
        dimension: req.body.dimension || item.dimension,
        last_service_date: req.body.last_service_date || item.last_service_date,
        next_service_date: req.body.next_service_date || item.next_service_date

    };
    equipment = await Equipment.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(equipment);
});

//delete equipment
//http://localhost:8020/equipment/delete/:id
router.route("/delete/:id").delete(async (req, res)=>{
    let equipmentId = req.params.id;

    await Equipment.findByIdAndDelete(equipmentId).then(()=>{
        res.status(200).send({status: "Equipment deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//get one equipment
//http://localhost:8020/equipment/get/:id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Equipment.findById(id).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;