const mongoose = require('mongoose')
 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ||"mongodb+srv://juniorpappoe:Q0p0dtrKamRaErxR@niidata.73zc8.mongodb.net/?retryWrites=true&w=majority&appName=NIIDATA\n" +
            "API_URL=http://localhost:5173");
        console.log(`connected to mongodb`);
    } catch (error) {
        console.log("Error connecting to mongodb", error.message);
    }
}

module.exports = connectDB