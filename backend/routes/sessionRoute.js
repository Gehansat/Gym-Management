const router = require("express").Router();
const { request } = require("express");
let  Session = require("../models/sessionModel")


//add sessions
//http://localhost:8020/session/add
router.route("/add").post((req,res)=>{
    const instructor_name = req.body.instructor_name;
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;


    const newSession = new Session({
        instructor_name,
        description,
        location,
        date,
        start_time,
        end_time,

    })

    newSession.save().then(()=>{
        res.json("Session Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//fetch sessions
//http://localhost:8020/session/
router.route("/").get((req,res)=>{
    Session.find().then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err)
    })
})

//update sessions
//http://localhost:8090/session/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let sessionId = req.params.id;
    const {instructor_name,description,location,date,start_time,end_time,} = req.body;

    const updateSession = {
        instructor_name,
        description,
        location,
        date,
        start_time,
        end_time
    }

    const update = await Session.findByIdAndUpdate(sessionId,updateSession).then(()=>{
        res.status(200).send({status: "Session Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let session = await Session.findById(req.params.id);
    const data = {
        instructor_name: req.body.instructor_name || session.instructor_name,
        description: req.body.description || session.description,
        location: req.body.location || session.location,
        date: req.body.date || session.date,
        start_time: req.body.start_time || session.start_time,
        end_time: req.body.end_time || session.end_time

    };
    session = await Session.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(session);
});

//delete session
//http://localhost:8020/session/delete/:id
router.route("/delete/:id").delete(async (req, res)=>{
    let sessionId = req.params.id;

    await Session.findByIdAndDelete(sessionId).then(()=>{
        res.status(200).send({status: "Session deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//get one of the session
//http://localhost:8020/session/get/:id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Session.findById(id).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;