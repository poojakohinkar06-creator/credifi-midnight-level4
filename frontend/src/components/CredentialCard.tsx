import { Card } from "./Card";
import { Button } from "./Button";
import { ArrowRightIcon, CheckIcon, LockIcon } from "./Icons";

type CredentialCardProps = {
  issuerName: string;
  verified: boolean;
  monthlyIncome: number;
  previousDefault: boolean;
  onIncomeChange: (value: number) => void;
  onDefaultChange: (value: boolean) => void;
  onContinue: () => void;
  continueLabel?: string;
};

export function CredentialCard({
  issuerName,
  verified,
  monthlyIncome,
  previousDefault,
  onIncomeChange,
  onDefaultChange,
  onContinue,
  continueLabel = "Continue to Requirements",
}: CredentialCardProps) {
  return (
    <Card className="credential-card" highlight>
      <div className="card-head">
        <div className="card-title-wrap">
          <h3>Your Financial Details</h3>
          <span className="verified-pill">
            <CheckIcon size={14} />
            {verified ? "Verified" : "Pending"}
          </span>
        </div>
        <p className="issuer-name">{issuerName}</p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span className="field-label">Monthly Income</span>
          <input
            type="number"
            min={0}
            max={65535}
            value={monthlyIncome}
            placeholder="e.g. 65000"
            onChange={(e) => onIncomeChange(Number(e.target.value))}
          />
          <span className="field-hint">Your exact income used for the proof</span>
          <span className="field-example">Example: ₹65,000</span>
        </label>

        <label className="field check-field">
          <span className="field-label">Previous Loan Default?</span>
          <div className="check-row">
            {(["No", "Yes"] as const).map((option) => {
              const value = option === "Yes";
              const selected = value === previousDefault;
              return (
                <button
                  key={option}
                  type="button"
                  className={`seg-btn ${selected ? "selected" : ""} ${option === "Yes" ? "warn-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => onDefaultChange(value)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <span className="field-hint">Have you had a loan default before?</span>
        </label>
      </div>

      <p className="flow-note">
        <LockIcon size={15} />
        <span>Your income is used to generate the proof but never revealed publicly.</span>
      </p>

      <div className="card-foot">
        <Button variant="primary" onClick={onContinue} icon={<ArrowRightIcon size={16} />}>
          {continueLabel}
        </Button>
      </div>
    </Card>
  );
}
