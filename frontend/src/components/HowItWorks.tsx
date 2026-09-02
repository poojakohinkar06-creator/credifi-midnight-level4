import { BoltIcon, CheckIcon, KeyIcon, WalletIcon } from "./Icons";

const STEPS = [
  { title: "Verify", text: "Receive a trusted financial credential.", icon: CheckIcon },
  { title: "Connect", text: "Connect your Midnight-compatible wallet.", icon: WalletIcon },
  { title: "Prove", text: "Generate a privacy-preserving proof.", icon: BoltIcon },
  { title: "Verify", text: "Lender receives the eligibility result.", icon: KeyIcon },
];

export function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="section-head">
        <p className="eyebrow">Simple by design</p>
        <h2>How It Works</h2>
        <p className="section-sub">A four-step flow, understandable for anyone.</p>
      </div>
      <div className="hiw-grid">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <article key={s.title} className="hiw-step">
              <span className="hiw-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="hiw-icon" aria-hidden>
                <Icon size={22} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
