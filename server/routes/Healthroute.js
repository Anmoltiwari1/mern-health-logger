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
      const today=new Date();
        const newlog = new HealthLogs({
          user: req.user.id,
          weight,
          sleep,
          waterIntake,
          mood,
          exercise,
          date: today,
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
    const userId = req.user.id;

     const start = new Date(date + "T00:00:00Z");
     const end = new Date(date + "T23:59:59Z");

     console.log("User requesting log:", userId);
     console.log("Looking from:", start, "to", end);
    

    try {
        const logs = await HealthLogs.find({
          user: req.user.id,
          date: {
            $gte: start,
            $lte: end,
          },
        });
        res.status(201).json({ message: "Date is complied",logs});
        
    } catch (error) {
        res.status(500).json({message:"Error is date",error});
    }
})

module.exports = router;