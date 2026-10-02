// @ts-nocheck
"use client";
import { usePetSite } from "../../../petSite";

import React, { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "../../ui/animations";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaw,
  FaChevronDown,
} from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  phone: FaPhoneAlt,
  email: FaEnvelope,
  location: FaMapMarkerAlt,
  visit: FaMapMarkerAlt,
  clock: FaClock,
  hours: FaClock,
  paw: FaPaw,
};




export default function ContactSec() {
const petData = usePetSite();
const contactData: ContactSecData = petData.contactSec as ContactSecData;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!contactData) return null;

  const { touchTitle, infoCards, formTitle, formSubtitle, form } = contactData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <section className="relative max-w-[1320px] mt-8 sm:mt-10 md:mt-12 lg:mt-14 mx-auto w-full overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <FadeIn direction="up" delay={0.05}>
              <div className="mb-6 mt-7">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B26] tracking-tight mb-2">
                  {touchTitle}
                </h2>
                <div className="flex items-center gap-2">
                  <FaPaw className="w-3.5 h-3.5 text-[#F37021]" />
                  <div className="h-[2.5px] w-8 bg-[#F37021] rounded-full" />

                </div>
              </div>
              <StaggerContainer className="flex flex-col gap-4 sm:gap-4.5 w-full">
                {infoCards?.map((card) => {
                  const IconComp = iconMap[card.icon] || FaPhoneAlt;
                  const isOrangeBg = card.iconBgColor === "orange";

                  return (
                    <StaggerItem key={card.id} direction="up">
                      <div className="bg-[#FFF9F6] border border-[#FDE8DC]/70 rounded-[20px] p-4.5 sm:p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-xs hover:border-[#F37021]/30 group">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105 ${isOrangeBg
                            ? "bg-[#F37021] text-white shadow-orange-500/20"
                            : "bg-[#23150C] text-white"
                            }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <h3 className="text-base md:text-[18px] font-bold text-[#1E1B26] mb-1">
                            {card.title}
                          </h3>
                          <p className="text-sm md:text-[16px] font-normal text-[#1E1B26] leading-snug break-words">
                            {card.value}
                          </p>
                          {card.subtext && (
                            <p className="text-sm text-[#1E1B26] font-normal leading-relaxed mt-0.5">
                              {card.subtext}
                            </p>
                          )}
                        </div>

                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

            </FadeIn>
          </div>
          <div className="lg:col-span-7 flex flex-col  ">
            <FadeIn direction="up" delay={0.1} className="h-full">
              <div className="bg-white border border-neutral-200/70 rounded-[28px] sm:rounded-[32px] p-10 shadow-xs flex flex-col justify-between h-full">

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B26] tracking-tight mb-2">
                    {formTitle}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-[2.5px] w-8 bg-[#F37021] rounded-full" />
                  </div>
                  <p className="text-sm sm:text-sm text-[#615147] font-normal leading-relaxed mb-6 sm:mb-8">
                    {formSubtitle}
                  </p>
                  {isSubmitted && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2">
                      <FaPaw className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 md:gap-7 lg:gap-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={form?.namePlaceholder || "Your Name"}
                        className="w-full border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#F37021] focus:outline-hidden rounded-xl px-4 py-5 text-sm text-[#1E1B26] placeholder:text-neutral-400 font-medium transition-all"
                      />

                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={form?.phonePlaceholder || "Phone Number"}
                        className="w-full border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#F37021] focus:outline-hidden rounded-xl px-4 py-5 text-sm text-[#1E1B26] placeholder:text-neutral-400 font-medium transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={form?.emailPlaceholder || "Email Address"}
                        className="w-full border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#F37021] focus:outline-hidden rounded-xl px-4 py-5 text-sm text-[#1E1B26] placeholder:text-neutral-400 font-medium transition-all"
                      />

                      <div className="relative w-full">
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#F37021] focus:outline-hidden rounded-xl px-4 py-5 text-sm text-[#1E1B26] font-medium transition-all appearance-none cursor-pointer pr-10"
                        >
                          <option value="" disabled className="text-neutral-400">
                            {form?.subjectPlaceholder || "Select Subject"}
                          </option>
                          {form?.subjectOptions?.map((opt, idx) => (
                            <option key={idx} value={opt} className="text-[#1E1B26]">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={form?.messagePlaceholder || "Your Message"}
                        className="w-full border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#F37021] focus:outline-hidden rounded-xl px-4 py-5 text-sm text-[#1E1B26] placeholder:text-neutral-400 font-medium transition-all min-h-[140px] resize-none"
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F37021] hover:bg-[#d95c0e] text-white font-extrabold text-sm sm:text-base transition-colors duration-300 shadow-sm shadow-orange-500/20 cursor-pointer"
                      >
                        <span>{form?.submitBtnText || "Send Message"}</span>
                        <FaPaw className="w-4 h-4 text-white" />
                      </button>
                    </div>

                  </form>
                </div>

              </div>
            </FadeIn>
          </div>

        </div>
        <FadeIn direction="up" delay={0.1} className="h-full">
          <div className="mt-6 sm:mt-8 md:mt-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224356.85923192592!2d77.23701088488971!3d28.522404036526275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1786345160037!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              className="rounded-[20px] shadow-2xl border border-slate-800/80"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </FadeIn>
      </div>

    </section>
  );
}
