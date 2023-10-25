const router = require("express").Router();
const { request } = require("express");
let  Store = require("../models/storeModel")


//add items
//http://localhost:8020/item/add
router.route("/add").post((req,res)=>{
    const item_code = req.body.item_code;
    const item_name = req.body.item_name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image = req.body.image;


    const newItem = new Store({
        item_code,
        item_name,
        description,
        price,
        quantity,
        image,

    })

    newItem.save().then(()=>{
        res.json("Item Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//fetch items
//http://localhost:8020/item/
router.route("/").get((req,res)=>{
    Store.find().then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err)
    })
})

//update items
//http://localhost:8090/item/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let itemId = req.params.id;
    const {item_code,item_name,description,price,quantity,image,} = req.body;

    const updateItem = {
        item_code,
        item_name,
        description,
        price,
        quantity,
        image,

    }

    const update = await Store.findByIdAndUpdate(itemId,updateItem).then(()=>{
        res.status(200).send({status: "Item Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let item = await Store.findById(req.params.id);
    const data = {
        item_code: req.body.item_code || item.item_code,
        item_name: req.body.item_name || item.item_name,
        description: req.body.description || item.description,
        price: req.body.price || item.price,
        quantity: req.body.quantity || item.quantity,
        image: req.body.image || item.image

    };
    item = await Store.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(item);
});

//delete item
//http://localhost:8020/item/delete/:id
router.route("/delete/:id").delete(async (req, res)=>{
    let itemId = req.params.id;

    await Store.findByIdAndDelete(itemId).then(()=>{
        res.status(200).send({status: "Item deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//get one of the Item
//http://localhost:8020/item/get/:id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Store.findById(id).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;