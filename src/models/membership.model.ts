import mongoose from "mongoose";

const { Schema } = mongoose;

const membershipSchema = new Schema(
  {
    userId: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    },
    plan: {
      type: String,
    },
  },
  { timestamps: true }
);

const Membership = mongoose.models.Membership || mongoose.model("Membership", membershipSchema);
export default Membership;
 