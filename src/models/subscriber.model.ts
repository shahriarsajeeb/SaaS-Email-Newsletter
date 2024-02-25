import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberShema = new Schema(
  {
    email: {
      type: String,
    },
    newsLetterOwnerId: {
      type: String,
    },
    source: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Subscriber =
  mongoose.models.Subscribers || mongoose.model("Subscribers", subscriberShema);

export default Subscriber;
