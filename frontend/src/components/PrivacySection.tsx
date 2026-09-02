import { FingerprintIcon, LockIcon, CheckIcon } from "./Icons";

const POINTS = [
  {
    title: "Private Data",
    text: "Your financial credential stays private.",
    icon: LockIcon,
  },
  {
    title: "Zero-Knowledge Verification",
    text: "Only the required condition is proven.",
    icon: FingerprintIcon,
  },
  {
    title: "Minimal Disclosure",
    text: "The lender receives the eligibility result, not your financial history.",
    icon: CheckIcon,
  },
];

export function PrivacySection() {
  return (
    <section className="section section-alt" id="privacy">
      <div className="section-head">
        <p className="eyebrow">Privacy first</p>
        <h2>Your data stays yours.</h2>
        <p className="section-sub">
          CrediFi verifies whether you satisfy a financial requirement without requiring the lender to
          see your exact financial information.
        </p>
      </div>
      <div className="privacy-grid">
        {POINTS.map((p) => {
          const Icon = p.icon;
          return (
            <article key={p.title} className="privacy-point">
              <span className="privacy-icon" aria-hidden>
                <Icon size={22} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
