const mongoose=require("mongoose");

const goalSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    target:{
        type:Number,
        required:true,
    },
    unit:{
        type:String,
        required:true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Goal", goalSchema);