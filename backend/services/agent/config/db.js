import mongoose from "mongoose"

const connectDb =async()=>{
    try{
        console.log(JSON.stringify(process.env.MONGODB_URI));
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("db connected")
    }
    catch(error){
        console.log(error)
    }
}
export default connectDb