import type { Metadata } from "next";
import ThankYouPage from "@/app/thankyou";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for connecting with Lestow. Let's bring your next idea to life.",
};

export default function Page() {
  return <ThankYouPage />;
}
