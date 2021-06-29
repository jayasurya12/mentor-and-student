const router=require('express').Router();
const Mentor=require("../models/mentor");
const Student= require("../models/students")
router.get('/',(req,res)=>{
    res.send("it  is Mentor")
});
/////////////////////-------------Mentor Data Adding--------------//////////////////////
router.post("/add",async(req,res)=>{
    try {
        const data=await Mentor.create(req.body);
        return res.json(data)
    } catch (error) {
        res.json({msg:error.message})
    }
})
///////////////////------------Mentor-Find all data--------------////////////////////////
router.get("/find",async(req,res)=>{
    try {
        const getData=await Mentor.find({})
        res.json(getData)
    } catch (error) {
        res.json(({msg:error.message}))
    }
})
/////////////////---------Mentor--Update using ID ------------//////////////
router.put("/update/:id",async(req,res)=>{
    try {
        const update=await Mentor.findByIdAndUpdate(
            {_id:req.params.id},
            {
                name:req.body.name,
                age:req.body.age,
                contact:req.body.contact,
                experience:req.body.experience
            },
            {new:true}
            )
            return res.json(update);
    } catch (error) {
        res.json({msg:error.message})
    }
})

///////////////------------------mentor data delete using id----------------////////////////
router.delete("/delete/:id",async(req,res)=>{
    try {
        const delMentor=await Mentor.findByIdAndDelete({_id:req.params.id})
        return res.json(delMentor)
    } catch (error) {
        res.json({msg:error.message})
    }
})

//it is find mentors students---------------///////////////
router.get('/find_ment_Student/:id',async(req, res)=>{
    try {
        const findStudent = await Mentor.findById({_id:req.params.id});
        res.json(findStudent.student_Data)
    } catch (error) {
        res.json({message: error.message})
    }
})
/////////////////--------update for mentor down ------student Updates--------/////////
router.put("/Update_met_student/:id",async(req,res)=>{
    try {
        const session=await Mentor.startSession();
        const student=new Student(req.body);
        const studentData=await student.save({session:session})
        const mentor=await Mentor.findByIdAndUpdate(
            {_id:req.params.id},
            {$push:{student_Data:req.body}},
            {new:true}
            ).session(session)
            res.json({student:studentData,mentor:mentor})
    } catch (error) {
        res.json({msg:error.message})
    }
}) 
//////////////////////
// router.patch("/patch/:id",async(req,res)=>{
//     try {
//         const ment=await Mentor.findByIdAndUpdate({_id:req.params.id})
//         if(ment){
//         const stu=await Student.findByIdAndUpdate(
//             {_id:req.body.id},
//             {$push:{
//                 name:req.body.name,
//                 department:req.body.department,
//                 year:req.body.year,
//                 age:req.body.age,
//                 contact_no:req.body.contact
//             }},
//             {new:true}
//         )
//     }
//     res.json(ment)
//     } catch (error) {
//         res.json({msg:error.message})
//     }
// })


module.exports=router;
