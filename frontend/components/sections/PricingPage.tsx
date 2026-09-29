import Pricing from "./Pricing";
import SitePageShell from "./SitePageShell";

export default function PricingPage() {
  return (
    <SitePageShell
      title={
        <>
          Simple <span className="text-blue-600">pricing</span>
        </>
      }
      subtitle="Starter is free for every website. Upgrade to Core for AI, hosting, and a custom domain."
      cta={{ label: "Start building", href: "/auth" }}
      bandTitle="Two plans: free Starter, or Core at $9/month per website."
    >
      <Pricing hideHeader />
    </SitePageShell>
  );
}
