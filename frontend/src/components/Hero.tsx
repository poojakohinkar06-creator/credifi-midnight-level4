import { Button } from "./Button";
import { ArrowRightIcon, LockIcon, ShieldIcon, SparkleIcon } from "./Icons";

type HeroProps = {
  onStart: () => void;
  onHowItWorks: () => void;
};

const FLOW = [
  { label: "Private Financial Credential", icon: LockIcon, tone: "violet" },
  { label: "Zero-Knowledge Proof", icon: SparkleIcon, tone: "blue" },
  { label: "Verified Eligibility", icon: ShieldIcon, tone: "green" },
];

export function Hero({ onStart, onHowItWorks }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="dot" aria-hidden /> Zero-Knowledge Verified
        </p>
        <h1 className="hero-title">Check Your Loan Eligibility</h1>
        <p className="hero-lead">
          Prove you meet the lender's requirements without sharing your private financial data.
        </p>
        <div className="hero-actions">
          <Button variant="primary" size="lg" onClick={onStart} icon={<ArrowRightIcon />}>
            Start Verification
          </Button>
          <Button variant="outline" size="lg" onClick={onHowItWorks}>
            How It Works
          </Button>
        </div>
        <p className="hero-trust">
          <span className="trust-icon" aria-hidden>
            <LockIcon size={15} />
          </span>
          Your financial data stays private
        </p>
      </div>

      <div className="hero-flow" aria-label="Privacy flow">
        {FLOW.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className={`flow-step flow-${step.tone}`}>
              <span className="flow-icon" aria-hidden>
                <Icon size={20} />
              </span>
              <span className="flow-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
