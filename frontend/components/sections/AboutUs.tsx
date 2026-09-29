import SitePageShell from "./SitePageShell";

const values = [
  {
    title: "Ship faster",
    body: "Lestow turns a conversation into a complete website so teams can go from idea to live in minutes, not weeks.",
  },
  {
    title: "Stay in control",
    body: "AI drafts the first version. You edit copy, images, colors, and structure until it matches the brand.",
  },
  {
    title: "Built to publish",
    body: "Every site is designed to work on desktop and mobile, with a clear path from preview to a live domain.",
  },
];

export default function AboutUs() {
  return (
    <SitePageShell
      title={
        <>
          About   <span className="text-blue-600">us</span>
        </>
      }
      subtitle="We help businesses launch professional websites through conversation — without a design team or a development sprint."
      cta={{ label: "Start building", href: "/pricing" }}
      bandTitle="An AI website builder for people who want to ship, not wrestle with tools."
    >
      <section className="mx-auto max-w-[1040px] px-5 pb-20 pt-6 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="hidden text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
            Why we built Lestow
          </h2>
          <p className="mt-5 text-sm leading-7 text-neutral-600 sm:text-[15px]">
            Most businesses already know what they need to say. They just should
            not need a stack of tools, templates, and handoffs to put it online.
            Lestow uses the details you share — your business, goals, and
            preferences — to generate a complete site, then keeps every section
            editable.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <li
              key={value.title}
              className="rounded-2xl border border-black/[0.06] bg-[#f8f8f8] px-6 py-7"
            >
              <h3 className="text-lg font-medium tracking-[-0.03em]">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </SitePageShell>
  );
}
