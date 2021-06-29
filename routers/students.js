const router=require("express").Router()
const Students=require("../models/students");
const Mentor=require("../models/mentor");

router.get("/",(req,res)=>{
    res.send("it is student")
})
//////////////-----------student data created the database----------///////////////
router.post("/add",async(req,res)=>{
    try {
        const studentsList=await Students.create(req.body)
        res.json(studentsList)
    } catch (error) {
        res.json({msg:error.message})
    }
})

/////////////set the students with particular mentors
router.post("/add/mentor/:id",async(req,res)=>{
    try {
        const session=await Students.startSession();
        const data=new Students(req.body);
        const studentData=await data.save({session:session});
        const mentorData=await Mentor.findByIdAndUpdate(
            {_id:req.params.id},
            {$push:{student_Data:studentData}},
            {new:true}
        )
        .session(session);
        res.json({user:studentData,mentor:mentorData})
    } 
    catch (error) {
        res.json({msg:error.message})
    }
})

////////////---------id using Update the Students data---------/////////////
router.put("/update",async(req,res)=>{
    try {
        const updateID=await Students.findByIdAndUpdate(
            {_id:req.body.id},
            {$push:{
                name:req.body.name,
                age:req.body.age,
                contact:req.body.contact,
                department:req.body.department,
                year:req.body.year
            }}
            )
    } catch (error) {
        
    }
})
/////////////------ID -usind Delete the students Data--------
router.delete("/delete/:id",async(req,res)=>{
    try {
        const stuDel=await Student.findOneAndDelete({_id:req.params.id})
        res.json(stuDel)
    } catch (error) {
        res.json({msg:error.message})
    }
})

//////////////////ID-using--Find-the-Students data---------///////////////
router.get("/get/:id",async(req,res)=>{
    try {
        const id=await Students.findById({_id:req.params.id},{new:true})
        res.json(id)
    } catch (error) {
        res.json({msg:error.message})
    }
})

/////////////student -find All Data----------/////////////////
router.get("/getAll",async(req,res)=>{
    try {
        const studentAll=await Students.find({});
        res.json(studentAll)
    } catch (error) {
        res.json({msg:error.message})
    }
})

module.exports=router;