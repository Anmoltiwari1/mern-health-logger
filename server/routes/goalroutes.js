const authmiddleware =require("../middleware/auth");
const express=require('express');
const Goal = require("../models/Goal"); 

router=express.Router();

router.post("/", authmiddleware, async (req, res) => {
  const { type, target, unit } = req.body;

  try {
    const goal = new Goal({
      user: req.user.id,
      type,
      target,
      unit,
    });

    await goal.save();
    res.status(201).json({ message: "Goal set successfully", goal });
  } catch (error) {
    res.status(500).json({ message: "Error is goals", error });
  }
});

router.get("/",authmiddleware,async (req,res)=>{
    try {
        const goals = await Goal.find({ user: req.user.id }).sort({
          createdAt: -1,
        });
        res.status(200).json({ goals });
    } catch (error) {
        res.status(500).json({message:"Error in fetching goal",error});
    }
})

module.exports = router;