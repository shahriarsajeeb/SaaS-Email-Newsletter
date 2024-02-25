"use server";

import Subscriber from "@/models/subscriber.model";
import { generateAnalyticsData } from "@/shared/utils/analytics.generator";

export const subscribersAnalytics = async () => {
  try {
    const subscribers = await generateAnalyticsData(Subscriber);
    return subscribers;
  } catch (error) {
    console.log(error);
  }
};
