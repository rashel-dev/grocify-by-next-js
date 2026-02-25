import mongoose from "mongoose";

const mongodb_uri = process.env.MONGODB_URI;

if(!mongodb_uri){
    throw new Error("Please define the MONGODB_URI in the environment variable");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null};
}

const dbConnect = async () => {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(mongodb_uri).then((conn) => conn.connection) 
    }

    try{
        cached.conn = await cached.promise;
        return cached.conn;    
    } catch (error) {
        cached.promise = null;   
        throw error;
    }}

export default dbConnect;

