const mongoose=require("mongoose");


const healthLogScehma=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    date:{
        type:Date,
        default:Date.now,
        required:true,
    },

    weight:{
        type:Number,
    },

    sleep:{
        type:Number,
    },

    waterIntake:{
        type:Number,
    },

    mood:{
        type:String,
    },
    exercise:{
        type:String,
    }
})

module.exports=mongoose.model("HealthLogs",healthLogScehma);