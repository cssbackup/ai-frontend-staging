// @ts-nocheck
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import PlumbingInnerBanner1, {ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { JobDetailItem, JObDetailsBannerData } from "../types/plumbing";
import type { InnerBannerAppearance } from "../../../types/innerBannerAppearance";
import { Check, UploadCloud, Lock, ArrowRight, MapPin, Clock, BarChart3 } from "lucide-react";
import type { SectionProps } from "../../../types/section";
import { getJobBySlug, site } from "../data/plumbing1";
import { useOptionalPreview } from "../../context/PreviewContext";
import {
  defaultJobApplicationFormFields,
  normalizePlumbingFormFields,
  type PlumbingFormField,
} from "../form/PlumbingFormFields";

interface JobDetailsProps {
  jobData?: JobDetailItem;
  bannerData?: JObDetailsBannerData;
  appearance?: InnerBannerAppearance;
  formTitle?: string;
  formFields?: PlumbingFormField[];
  submitButtonText?: string;
  securityNotice?: string;
}

function JobDetailsClient({
  jobData,
  bannerData,
  appearance,
  formTitle = "Apply for This Position",
  formFields = defaultJobApplicationFormFields,
  submitButtonText = "Submit Application",
  securityNotice = "Your information is secure and will only be used for this application.",
}: JobDetailsProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileNames((prev) => ({ ...prev, [name]: e.target.files![0].name }));
      setFormData((prev) => ({ ...prev, [name]: e.target.files![0].name }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Application submitted successfully!");
  };

  if (!jobData) return null;

  return (
    <main>
      {/* PAGE BANNER */}
      {bannerData && (
        <PlumbingInnerBanner1
          appearance={appearance ?? plumbingBannerAppearance(jobData)}
          title={bannerData.title}
          breadcrumbHome={bannerData.breadcrumbHome}
          breadcrumbCurrent={bannerData.breadcrumbCurrent}
          breadcrumbs={bannerData.breadcrumbs}
          backgroundImage={bannerData.backgroundImage}
          homeHref={bannerData.homeHref}
        />
      )}

      {/* MAIN CONTENT */}
      <section
        {...plumbingEditorAttrs(
          "Job Details",
          "title location jobType experience description keyResponsibilities requirements preferredQualifications formTitle formFields submitButtonText securityNotice",
        )}
        className="bg-[#FAFBFD] py-8 lg:py-12 text-[#0F172A]"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* RIGHT COLUMN IN DOM / FIRST ON MOBILE & TAB: Application Form Card (5 Cols) */}
            <ScrollReveal direction="right" className="order-1 lg:order-2 lg:col-span-5">
              <div
                {...plumbingEditorAttrs(
                  "Application Form",
                  "formTitle formFields submitButtonText securityNotice",
                )}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] sm:p-8"
              >
                {/* Form Title Header */}
                <div className="text-center lg:text-left">
                  <h3 className="text-xl lg:text-3xl font-bold text-[#0F172A]">
                    {formTitle}
                  </h3>
                  <div className="mt-2 h-1 w-10 bg-[#84CC16] rounded-full mx-auto lg:mx-0" />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {formFields.map((field, index) => {
                    const name = field.name || `field${index + 1}`;
                    const type = (field.type || "text").toLowerCase();
                    const required = field.required !== false;
                    const value = formData[name] ?? "";

                    if (type === "file") {
                      return (
                        <div key={`${name}-${index}`} className="text-left">
                          <label className="block text-sm font-bold text-[#0F172A]">
                            {field.label || `Field ${index + 1}`}
                            {required ? <span className="text-red-500"> *</span> : null}
                          </label>
                          <div className="mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#FAFBFD] p-6 text-center transition-all hover:border-[#0052CC]">
                            <UploadCloud className="h-8 w-8 text-[#0052CC]" />
                            <p className="mt-2 text-sm font-semibold text-[#0F172A]">
                              Drag & drop your file here
                            </p>
                            <p className="text-sm text-slate-400">
                              or{" "}
                              <label className="cursor-pointer font-bold text-[#0052CC] underline hover:text-blue-700">
                                Browse File
                                <input
                                  type="file"
                                  name={name}
                                  required={required}
                                  accept=".pdf,.doc,.docx"
                                  className="hidden"
                                  onChange={(event) => handleFileChange(name, event)}
                                />
                              </label>
                            </p>
                            <span className="mt-2 text-[10px] font-medium text-slate-400">
                              {fileNames[name]
                                ? `Selected: ${fileNames[name]}`
                                : field.placeholder || "PDF, DOC, DOCX (Max. 5MB)"}
                            </span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={`${name}-${index}`} className="text-left">
                        <label className="block text-sm font-bold text-[#0F172A]">
                          {field.label || `Field ${index + 1}`}
                          {required ? <span className="text-red-500"> *</span> : null}
                        </label>
                        {type === "textarea" ? (
                          <textarea
                            name={name}
                            rows={4}
                            required={required}
                            placeholder={field.placeholder}
                            value={value}
                            onChange={handleInputChange}
                            className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-[#FAFBFD] p-4 text-sm font-medium text-[#0F172A] outline-none transition-all placeholder:text-slate-400 focus:border-[#0052CC] focus:bg-white"
                          />
                        ) : type === "select" ? (
                          <select
                            name={name}
                            required={required}
                            value={value}
                            onChange={handleInputChange}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FAFBFD] px-4 py-3 text-sm font-medium text-[#0F172A] outline-none transition-all focus:border-[#0052CC] focus:bg-white"
                          >
                            <option value="">{field.placeholder || "Select an option"}</option>
                            {(field.options ?? []).map((option, optionIndex) => {
                              const optionLabel =
                                typeof option === "string"
                                  ? option
                                  : option.label || option.value || `Option ${optionIndex + 1}`;
                              const optionValue =
                                typeof option === "string"
                                  ? option
                                  : option.value || option.label || optionLabel;
                              return (
                                <option key={`${optionValue}-${optionIndex}`} value={optionValue}>
                                  {optionLabel}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <input
                            type={["text", "number", "email", "tel", "date", "url"].includes(type) ? type : "text"}
                            name={name}
                            required={required}
                            placeholder={field.placeholder}
                            value={value}
                            onChange={handleInputChange}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FAFBFD] px-4 py-3 text-sm font-medium text-[#0F172A] outline-none transition-all placeholder:text-slate-400 focus:border-[#0052CC] focus:bg-white"
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#84CC16] py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-[#74b512]"
                  >
                    <span>{submitButtonText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 pt-2 text-center text-[11px] font-medium text-slate-400">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{securityNotice}</span>
                  </div>
                </form>
              </div>
            </ScrollReveal>

            {/* LEFT COLUMN IN DOM / SECOND ON MOBILE & TAB: Job Overview & Description (7 Cols) */}
            <ScrollReveal direction="left" className="order-2 lg:order-1 lg:col-span-7">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1">
              {/* Job Description Section */}
              <div className="text-center lg:text-left">
                <h2 className="text-xl lg:text-3xl font-bold text-[#0F172A]">
                  {jobData.title || "Job Description"}
                </h2>
                <div className="mt-2 h-1 w-10 bg-[#84CC16] rounded-full mx-auto lg:mx-0" />
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-[#64748B] lg:justify-start">
                  {jobData.location ? (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-5 w-5 text-[#84CC16]" />
                      {jobData.location}
                    </span>
                  ) : null}
                  {jobData.jobType ? (
                    <span className="flex items-center gap-1">
                      <Clock className="h-5 w-5 text-[#84CC16]" />
                      {jobData.jobType}
                    </span>
                  ) : null}
                  {jobData.experience ? (
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-5 w-5 text-[#84CC16]" />
                      {jobData.experience}
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-sm sm:text-base font-medium leading-relaxed text-[#64748B]">
                  {jobData.description}
                </p>
              </div>

              {/* Key Responsibilities */}
              {jobData.keyResponsibilities && (
                <div className="text-center lg:text-left">
                  <h3 className="text-xl lg:text-3xl font-bold text-[#0F172A]">
                    Key Responsibilities
                  </h3>
                  <div className="mt-2 h-1 w-10 bg-[#84CC16] rounded-full mx-auto lg:mx-0" />
                  <ul className="mt-5 space-y-3.5">
                    {jobData.keyResponsibilities.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start justify-center lg:justify-start gap-3 text-left"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ECF8D8] text-[#84CC16]">
                          <Check className="h-3.5 w-3.5 stroke-[4]" />
                        </div>
                        <span className="text-sm sm:text-base font-semibold leading-relaxed text-[#334155]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {jobData.requirements && (
                <div className="text-center lg:text-left">
                  <h3 className="text-xl lg:text-3xl font-bold text-[#0F172A]">
                    Requirements
                  </h3>
                  <div className="mt-2 h-1 w-10 bg-[#84CC16] rounded-full mx-auto lg:mx-0" />
                  <ul className="mt-5 space-y-3.5">
                    {jobData.requirements.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start justify-center lg:justify-start gap-3 text-left"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ECF8D8] text-[#84CC16]">
                          <Check className="h-3.5 w-3.5 stroke-[4]" />
                        </div>
                        <span className="text-sm sm:text-base font-semibold leading-relaxed text-[#334155]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preferred Qualifications */}
              {jobData.preferredQualifications && (
                <div className="text-center lg:text-left">
                  <h3 className="text-xl lg:text-3xl font-bold text-[#0F172A]">
                    Preferred Qualifications
                  </h3>
                  <div className="mt-2 h-1 w-10 bg-[#84CC16] rounded-full mx-auto lg:mx-0" />
                  <ul className="mt-5 space-y-3.5">
                    {jobData.preferredQualifications.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start justify-center lg:justify-start gap-3 text-left"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ECF8D8] text-[#84CC16]">
                          <Check className="h-3.5 w-3.5 stroke-[4]" />
                        </div>
                        <span className="text-sm sm:text-base font-semibold leading-relaxed text-[#334155]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

const toSlug = (label: string) =>
  label.trim().toLowerCase().replace(/\s+/g, "-");

const jobFieldKeys = [
  "id",
  "slug",
  "title",
  "location",
  "jobType",
  "experience",
  "description",
  "keyResponsibilities",
  "requirements",
  "preferredQualifications",
] as const;

const pickJobFields = (record: Record<string, unknown>) => {
  const picked: Record<string, unknown> = {};
  for (const key of jobFieldKeys) {
    if (record[key] !== undefined) picked[key] = record[key];
  }
  return picked;
};

export default function PlumbingJobDetails1({ data }: SectionProps) {
  const preview = useOptionalPreview();
  const record = (data ?? {}) as Record<string, unknown>;
  const slug = typeof record.slug === "string" ? record.slug : toSlug(preview?.currentPage ?? "");
  const jobs = Array.isArray(record.jobs)
    ? (record.jobs as JobDetailItem[])
    : Array.isArray(record.jobDetailItems)
      ? (record.jobDetailItems as JobDetailItem[])
      : site.jobDetails.jobs;
  const matched =
    jobs.find((item) => item.slug === slug) ??
    getJobBySlug(slug) ??
    jobs[0];
  const job = {
    ...(matched ?? {}),
    ...pickJobFields(record),
  } as JobDetailItem;
  const bannerData =
    (record.banner as JObDetailsBannerData | undefined) ?? site.jobDetails.banner;
  const formFields = Array.isArray(record.formFields)
    ? normalizePlumbingFormFields(record.formFields)
    : defaultJobApplicationFormFields;
  const formTitle =
    typeof record.formTitle === "string" && record.formTitle.trim()
      ? record.formTitle
      : "Apply for This Position";
  const submitButtonText =
    typeof record.submitButtonText === "string" && record.submitButtonText.trim()
      ? record.submitButtonText
      : "Submit Application";
  const securityNotice =
    typeof record.securityNotice === "string" && record.securityNotice.trim()
      ? record.securityNotice
      : "Your information is secure and will only be used for this application.";
  return (
    <JobDetailsClient
      jobData={job}
      bannerData={bannerData}
      appearance={plumbingBannerAppearance(data)}
      formTitle={formTitle}
      formFields={formFields}
      submitButtonText={submitButtonText}
      securityNotice={securityNotice}
    />
  );
}
