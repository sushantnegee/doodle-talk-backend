const mongoose = require("mongoose")


const connectDatabase = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`mongodb connected ${conn.connection.host}`);
    }catch(err){
        console.log(`ERROR: ${err.message}`)
        process.exit();
    }
}

module.exports = connectDatabase;