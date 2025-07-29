const express=require('express');
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const authmiddleware=require("../middleware/auth");

const router=express.Router();

router.post('/signup',async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User Alredy exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({name,email,password:hashedPassword});
        await newUser.save();

        res.status(201).json({message:"User created Succesfully"});

    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

router.post('/login',async(req,res)=>{
    const {email, password } = req.body;

    try {
          const existingUser=await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({ message: "User does not exist" });

        }

        const isMatch=await bcrypt.compare(password,existingUser.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET,
          {expiresIn:"7d"}
        );

        return res.status(200).json({
          message: "Login Successfull",
          token,
          user: {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
          },
        });
        
    } catch (error) {
        res.status(500).json({message:"Error caused"},error);
    }
})

router.get("/me", authmiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

module.exports=router;
