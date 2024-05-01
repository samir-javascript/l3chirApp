import mongoose from "mongoose";
let connect = false;

export const connectToDb = async()=> {
    try {
        if(!process.env.MONGODB_URL) {
            throw new Error('Mongo db url missing')
        }
        if(connect) {
            console.log('mongodb is already connected')
        }
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "restaurant_app"
        })
        console.log('mongodb has been connected successfuly')
    } catch (error) {
        console.log(error)
    }
    return connect = true
}