import mongoose from "mongoose";

const { Schema } = mongoose;

const emailSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    newsLetterOwnerId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Email = mongoose.models.Emails || mongoose.model("Emails", emailSchema);
export default Email;
