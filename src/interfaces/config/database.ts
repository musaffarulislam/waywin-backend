import mongoose from "mongoose";
import env from "../../app/environment/environment";

const dbname: String = env.getDBName();
const MONGODB_URI = `${process.env.MONGO_URI}`;


const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as Parameters<typeof mongoose.connect>[1];


export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions)
    console.log("Connected to database",MONGODB_URI);
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};




