import mongoose from "mongoose";

const connectdb = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("connected sucessfully...");
  } catch (err) {
    console.log(err);
  }
};

export default connectdb;
