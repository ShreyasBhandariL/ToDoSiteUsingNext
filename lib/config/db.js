import mongoose from "mongoose"

export const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://shreyasbhandaricse:hkjaGxM5AEtK4Twi@test.nn11wv9.mongodb.net/demo");
        console.log("Connected to db");
    } catch (error) {
        console.error("Error While reterving: ", error);
    }
}