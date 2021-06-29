const mongoose=require("mongoose");

const MentorSchema=new mongoose.Schema({
    name:String,
    age:Number,
    contact_no:Number,
    experience:{
        type:Number,
        default:0
    },
    student_Data:[],
    },
    {
        timestamps:true
    }
)

const mentor=mongoose.model("mentors",MentorSchema);

module.exports=mentor;