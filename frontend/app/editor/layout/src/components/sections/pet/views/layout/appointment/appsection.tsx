// @ts-nocheck
"use client";
import { usePetSite } from "../../../petSite";

import React, { useState } from "react";
import { FadeIn } from "../../ui/animations";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Lock,
  ChevronDown,
} from "lucide-react";
import { FaPaw } from "react-icons/fa";




const contactIconMap: Record<string, React.ElementType> = {
  phone: Phone,
  email: Mail,
  map: MapPin,
  clock: Clock,
};

export default function AppSection() {
const petData = usePetSite();
const appointmentData: AppointmentSecData = petData.appointmentSec as AppointmentSecData;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    petName: "",
    petType: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!appointmentData) return null;

  const { badge, title, description, formTitle, form, sidebar } = appointmentData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        petName: "",
        petType: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <div className="flex flex-col items-start  mb-6">
          <FadeIn direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 text-[#F37021] font-extrabold text-sm sm:text-base tracking-widest uppercase mb-2">
              <FaPaw className="w-5 h-5 text-[#F37021]" />
              <span>{badge}</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight leading-tight mb-2.5">
              {title}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-[#615147] font-normal">
              {description}
            </p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <FadeIn direction="up" delay={0.2} className="lg:col-span-8 w-full">
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 border border-neutral-100/90 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C1810] mb-1.5">
                {formTitle}
              </h2>
              <div className="w-14 h-1 bg-[#F37021] mb-6 sm:mb-8 rounded-full" />

              {submitted ? (
                <div className="bg-[#FEF5ED] border border-[#F37021]/30 text-[#2C1810] p-6 sm:p-8 rounded-2xl text-center my-8">
                  <FaPaw className="w-12 h-12 text-[#F37021] mx-auto mb-3 animate-bounce" />
                  <h3 className="text-xl font-bold mb-1.5">Appointment Request Sent!</h3>
                  <p className="text-sm sm:text-base text-[#615147]">
                    Thank you! Our team will contact you shortly to confirm your booking.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.fullNameLabel}
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={form.fullNamePlaceholder}
                        className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] placeholder:text-neutral-400 focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={form.phonePlaceholder}
                        className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] placeholder:text-neutral-400 focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={form.emailPlaceholder}
                        className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] placeholder:text-neutral-400 focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.petNameLabel}
                      </label>
                      <input
                        type="text"
                        name="petName"
                        required
                        value={formData.petName}
                        onChange={handleChange}
                        placeholder={form.petNamePlaceholder}
                        className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] placeholder:text-neutral-400 focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.petTypeLabel}
                      </label>
                      <div className="relative">
                        <select
                          name="petType"
                          required
                          value={formData.petType}
                          onChange={handleChange}
                          className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] appearance-none focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all cursor-pointer"
                        >
                          <option value="" disabled>
                            {form.petTypePlaceholder}
                          </option>
                          {form.petTypeOptions?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.serviceLabel}
                      </label>
                      <div className="relative">
                        <select
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] appearance-none focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all cursor-pointer"
                        >
                          <option value="" disabled>
                            {form.servicePlaceholder}
                          </option>
                          {form.serviceOptions?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.dateLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all cursor-pointer"
                        />
                        <Calendar className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                        {form.timeLabel}
                      </label>
                      <div className="relative">
                        <select
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] appearance-none focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all cursor-pointer"
                        >
                          <option value="" disabled>
                            {form.timePlaceholder}
                          </option>
                          {form.timeOptions?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <Clock className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-bold text-[#2C1810] mb-2">
                      {form.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={form.messagePlaceholder}
                      className="w-full bg-[#FAF9F6] border border-neutral-200/80 rounded-xl px-4.5 py-3.5 text-sm sm:text-base text-[#2C1810] placeholder:text-neutral-400 focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all resize-y"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#F37021] hover:bg-[#d95f19] text-white font-bold text-base sm:text-lg py-3 px-9 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md shadow-[#F37021]/20 cursor-pointer active:scale-98"
                    >
                      <span>{form.submitBtnText}</span>
                      <FaPaw className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm sm:text-sm text-neutral-500 mt-2">
                    <Lock className="w-4 h-4 text-neutral-400" />
                    <span>{form.privacyNote}</span>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.25} className="lg:col-span-4 w-full">
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-neutral-100/90 shadow-sm flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-[#2C1810] mb-1">
                  {sidebar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#7A6A60]">
                  {sidebar.subtitle}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {sidebar.contacts?.map((contact) => {
                  const IconComp = contactIconMap[contact.icon] || Phone;

                  return (
                    <div key={contact.id} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#F37021] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        <IconComp className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-bold text-[#2C1810]">
                          {contact.title}
                        </span>
                        {contact.lines ? (
                          contact.lines.map((line, lIdx) => (
                            <span key={lIdx} className="text-sm sm:text-sm text-[#615147] font-medium leading-relaxed">
                              {line}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm sm:text-sm text-[#615147] font-medium leading-relaxed">
                            {contact.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {sidebar.careBox && (
                <div className="bg-[#FEF5ED] border border-[#F37021]/15 rounded-2xl p-5 sm:p-6 mt-2">
                  <div className="flex items-center gap-2 text-[#F37021] font-bold text-base mb-2">
                    <FaPaw className="w-4.5 h-4.5 text-[#F37021]" />
                    <span>{sidebar.careBox.title}</span>
                  </div>
                  <p className="text-sm sm:text-sm text-[#615147] leading-relaxed">
                    {sidebar.careBox.description}
                  </p>
                </div>
              )}
            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
}
