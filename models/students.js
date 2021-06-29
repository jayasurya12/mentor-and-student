const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:String,
    age:Number,
    department:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    contact_no:Number
});

const students=mongoose.model("students",UserSchema);

module.exports=students;