// this file will set up the connection to the mongodb

import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedToplogy: true,
    });

    isConnected = true;

    console.log("MongoDb connected!");
  } catch (error) {
    console.error(error);
  }
};
