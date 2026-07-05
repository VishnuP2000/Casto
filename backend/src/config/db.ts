import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("err",err);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("Reconnected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});