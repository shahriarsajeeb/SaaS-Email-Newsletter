import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import Membership from "@/models/membership.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 }
      );
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // getting to the data we want from the event
    const subscription = event.data.object as Stripe.Subscription;
    const itemId: any = subscription.items.data[0].price.product;

    // Fetch the product (plan) details
    const product = await stripe.products.retrieve(itemId);

    const planName = product.name;

    switch (event.type) {
      case "customer.subscription.created":
        // customer subscription created
        const membership = await Membership.findOne({
          stripeCustomerId: subscription.customer,
        });

        if (membership) {
          await Membership.updateOne(
            {
              stripeCustomerId: subscription.customer,
            },
            { $set: { plan: planName } }
          );
        }
        break;
      case "customer.subscription.deleted":
        // subscription deleted
        break;

      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
};

export { webhookHandler as POST };
