import mongoose from "mongoose";
import { driver, createAstraUri } from "stargate-mongoose";

export const connectDb = async () => {
  try {
    const uri = createAstraUri(
      process.env.ASTRA_DB_API_ENDPOINT!,
      process.env.ASTRA_DB_APPLICATION_TOKEN!
    );

    // Check if there's an existing connection
    if (mongoose.connection.readyState !== 0) {
      // Disconnect the existing connection
      await mongoose.disconnect();
    }
    mongoose.set("autoCreate", true);
    mongoose.setDriver(driver);

    await mongoose
      .connect(uri, {
        isAstra: true,
      })
      .then((res) => {
        console.log("connected");
      })
      .catch((r) => {
        console.log(r);
      });
  } catch (error) {
    console.log(error);
  }
};
