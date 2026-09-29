// @ts-nocheck
"use client";

export type PlumbingFormField = {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<string | { label?: string; value?: string }>;
};

export const defaultQuoteFormFields: PlumbingFormField[] = [
  { label: "Name", name: "name", type: "text", placeholder: "Enter your full name", required: true },
  { label: "Email", name: "email", type: "email", placeholder: "Enter your email address", required: true },
  { label: "Phone", name: "phone", type: "tel", placeholder: "Enter your phone number", required: true },
  {
    label: "Type",
    name: "type",
    type: "select",
    placeholder: "Select type",
    required: true,
    options: [
      { label: "Residential Service", value: "residential" },
      { label: "Commercial Service", value: "commercial" },
      { label: "Emergency Repair", value: "emergency" },
      { label: "Maintenance", value: "maintenance" },
    ],
  },
  { label: "Requirements", name: "requirements", type: "textarea", placeholder: "Describe your plumbing requirements...", required: true },
];

export const defaultEnquiryFormFields: PlumbingFormField[] = [
  { label: "Name", name: "name", type: "text", placeholder: "Enter your full name", required: true },
  { label: "Email", name: "email", type: "email", placeholder: "Enter your email address", required: true },
  { label: "Phone", name: "phone", type: "tel", placeholder: "Enter your phone number", required: true },
  {
    label: "Type",
    name: "type",
    type: "select",
    placeholder: "Select type",
    required: true,
    options: [
      { label: "Residential Plumbing", value: "residential" },
      { label: "Commercial Plumbing", value: "commercial" },
      { label: "Emergency Service", value: "emergency" },
      { label: "Maintenance & Repair", value: "maintenance" },
    ],
  },
  { label: "Requirements", name: "requirements", type: "textarea", placeholder: "Please describe your enquiry...", required: true },
];

export const defaultContactFormFields: PlumbingFormField[] = [
  { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name", required: true },
  { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email address", required: true },
  { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your phone number", required: true },
  { label: "Subject", name: "subject", type: "text", placeholder: "Enter the subject", required: true },
  { label: "Message", name: "message", type: "textarea", placeholder: "Type your message here...", required: true },
];

export const defaultJobApplicationFormFields: PlumbingFormField[] = [
  { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name", required: true },
  { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email", required: true },
  { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your phone number", required: true },
  {
    label: "Experience (Years)",
    name: "experience",
    type: "select",
    placeholder: "Select experience",
    required: true,
    options: [
      { label: "1-2 Years", value: "1-2" },
      { label: "3-5 Years", value: "3-5" },
      { label: "5+ Years", value: "5+" },
    ],
  },
  { label: "Upload Resume", name: "resume", type: "file", placeholder: "PDF, DOC, DOCX (Max. 5MB)", required: true },
  { label: "Cover Letter (Optional)", name: "coverLetter", type: "textarea", placeholder: "Tell us why you're a great fit...", required: false },
];

export const normalizePlumbingFormFields = (fields: unknown): PlumbingFormField[] => {
  if (!Array.isArray(fields)) return [];
  return fields.flatMap((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const record = item as PlumbingFormField;
    const label = String(record.label ?? `Field ${index + 1}`).trim();
    const name =
      String(record.name ?? "")
        .trim()
        .replace(/\s+/g, "") ||
      label.toLowerCase().replace(/[^a-z0-9]+/g, "") ||
      `field${index + 1}`;
    return [
      {
        ...record,
        label,
        name,
        type: String(record.type ?? "text").toLowerCase(),
      },
    ];
  });
};

const fieldNameOf = (field: PlumbingFormField, index: number) =>
  field.name ||
  String(field.label ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "") ||
  `field${index + 1}`;

export default function PlumbingFormFields({
  fields,
  values,
  onChange,
  inputClassName,
  labelClassName,
}: {
  fields: PlumbingFormField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  inputClassName?: string;
  labelClassName?: string;
}) {
  const inputClass =
    inputClassName ??
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#051C42] outline-none transition-all placeholder:text-slate-400 focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC]";
  const labelClass =
    labelClassName ?? "block text-sm font-bold text-[#051C42]";

  return (
    <>
      {fields.map((field, index) => {
        const name = fieldNameOf(field, index);
        const type = (field.type || "text").toLowerCase();
        const required = field.required !== false;
        const value = values[name] ?? "";

        return (
          <div key={`${name}-${index}`}>
            <label className={labelClass}>
              {field.label || `Field ${index + 1}`}
              {required ? <span className="text-red-500"> *</span> : null}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                rows={4}
                required={required}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
                placeholder={field.placeholder}
                className={inputClass}
              />
            ) : type === "select" ? (
              <select
                name={name}
                required={required}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  {field.placeholder || "Select an option"}
                </option>
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
            ) : type === "file" ? (
              <input
                type="file"
                name={name}
                required={required}
                onChange={(event) =>
                  onChange(name, event.target.files?.[0]?.name ?? "")
                }
                className={inputClass}
              />
            ) : (
              <input
                type={["text", "number", "email", "tel", "date", "url"].includes(type) ? type : "text"}
                name={name}
                required={required}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
                placeholder={field.placeholder}
                className={inputClass}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
