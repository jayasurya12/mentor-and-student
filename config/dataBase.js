const mongoose=require("mongoose");

const url="mongodb+srv://jai:27121998vj@cluster0.ytezm.mongodb.net/user-assign?retryWrites=true&w=majority";
const connectDB=async()=>{
    try {
        const db=await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`mongoose ${db.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectDB;