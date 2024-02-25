"use server";

import Email from "@/models/email.model";
import { connectDb } from "@/shared/libs/db";

export const getEmails = async ({
  newsLetterOwnerId,
}: {
  newsLetterOwnerId: string;
}) => {
  try {
    await connectDb();
    const emails = await Email.find({ newsLetterOwnerId });
    return emails;
  } catch (error) {
    console.log(error);
  }
};
