import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/shared/libs/db";
import Subscriber from "@/models/subscriber.model";
import { validateEmail } from "@/shared/utils/ZeroBounceApi";

export async function POST(req: NextRequest, res: any) {
  try {
    const data = await req.json();
    const apiKey = data.apiKey;

    const decoded: any = jwt.verify(apiKey, process.env.JWT_SECRET_KEY!);

    await connectDb();
    // check if subscribers already exists
    const isSubscriberExist = await Subscriber.findOne({
      email: data.email,
      newsLetterOwnerId: decoded?.user?.id,
    });

    if (isSubscriberExist) {
      return NextResponse.json({ error: "Email already exists!" });
    }

    // Validate email
    const validationResponse = await validateEmail({ email: data.email });
    if (validationResponse.status === "invalid") {
      return NextResponse.json({ error: "Email not valid!" });
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email: data.email,
      newsLetterOwnerId: decoded?.user?.id,
      source: "By API",
      status: "Subscribed",
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
