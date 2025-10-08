import mongoose from "mongoose"

export const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to db");
    } catch (error) {
        console.error("Error While reterving: ", error);
    }
}