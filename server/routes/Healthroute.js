const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authmiddleware = require("../middleware/auth");
const HealthLogs=require("../models/HealthLog");


const router=express.Router();

router.post('/',authmiddleware,async (req,res)=>{
    const {weight, sleep, waterIntake, mood, exercise } = req.body;


    try {
        const newlog=new HealthLogs({
            user:req.user.id,
            weight,
            sleep,
            waterIntake,
            mood,
            exercise,
        });

        await newlog.save();

        res.status(201).json({message:"Health log created successfuly",newlog});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to save health logs",error:error.message});
    }
})

router.get("/daily/:date",authmiddleware,async (req,res)=>{
    const {date}=req.params;

    try {
        const logs = await HealthLogs.find({
          user: req.user.id,
          date: {
            $gte: new Date(date + "T00:00:00Z"),
            $lte: new Date(date + "T23:59:59Z"),
          },
        });
        res.status(201).json({ message: "Date is complied",logs});
        
    } catch (error) {
        res.status(500).json({message:"Error is date",error});
    }
})

module.exports = router;