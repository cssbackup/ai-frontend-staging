import type { Metadata } from "next";
import ContactUs from "@/components/layout/contact-us";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Lestow team about your website.",
};

export default function ContactPage() {
  return <ContactUs />;
}
