const express =require('express');
const User = require("../models/User");
const authmiddleware = require("../middleware/auth");
const Healthlogs=require("../models/HealthLog");
const Goal=require("../models/Goal");

const router=express.Router();


router.get("/all",authmiddleware,async(req,res)=>{
    try {
        const logs=await Healthlogs.find({user:req.user.id}).sort({date:-1});
        res.status(200).json({message:"All health logs dilivered",logs});


    } catch (error) {
        res.status(401).json({message:"Error is dispalying all health logs",error});
    }
})

router.put("/update/:id",authmiddleware,async (req,res)=>{
    const {id}=req.params;
    const updates = req.body;
    try {
        const log = await Healthlogs.findOneAndUpdate(
          { _id: id, user: req.user.id },
          updates,
          { new: true }
        );

        if (!log) {
          return res.status(404).json({ message: "Health log not found" });
        }

        res.status(200).json({ message: "Health log updated", log });

    } catch (error) {
        res.status(200).json({message:"Error in updation",error});
    }
});

router.delete("/delete/:id",authmiddleware,async (req,res)=>{

    const {id}=req.params;

    try {
        const deleted=await Healthlogs.findOneAndDelete({_id:id,user:req.user.id});

        if(!deleted){
             res.status(404).json({ message: "Error in deletion", deleted });
        }

        res.status(200).json({message:"Deletion done"})

    } catch (error) {
         res.status(200).json({ message: "Error in deletion", error });
    }
});

router.post("/goals",authmiddleware,async (req,res)=>{
    const {type,target,unit}=req.body;

    try {
        const goal=new Goal({
            user:req.user.id,
            type,
            target,
            unit,
        })
    
        await goal.save();
        res.status(201).json({ message: "Goal set successfully", goal });
    } catch (error) {
        res.status(500).json({message:"Error is goals",error});
    }
})

module.exports=router;