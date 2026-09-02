import { useState } from "react";
import { formatMoney } from "../lib/format";
import { Card } from "./Card";
import { Button } from "./Button";
import { ArrowRightIcon, InfoIcon, LockIcon } from "./Icons";

const MAX_INCOME = 65535;

type RequirementFormProps = {
  minimumIncome: number;
  requireNoDefault: boolean;
  lenderRef: string;
  onChange: (update: { minimumIncome: number; requireNoDefault: boolean; lenderRef: string }) => void;
  onContinue: () => void;
  continueLabel?: string;
};

export function RequirementForm({
  minimumIncome,
  requireNoDefault,
  lenderRef,
  onChange,
  onContinue,
  continueLabel = "Continue to Verification →",
}: RequirementFormProps) {
  const [incomeText, setIncomeText] = useState(String(minimumIncome));
  const [touched, setTouched] = useState(false);
  const income = Number(incomeText);

  const invalidNoNumber = incomeText.trim() !== "" && Number.isNaN(income);
  const invalidBelowZero = !Number.isNaN(income) && income < 0;
  const invalidAboveBound = !Number.isNaN(income) && income > MAX_INCOME;
  const invalid = touched && (invalidNoNumber || invalidBelowZero || invalidAboveBound);

  const error = invalidNoNumber
    ? "Enter a valid number."
    : invalidBelowZero
      ? "Income cannot be negative."
      : `Maximum income is ${formatMoney(MAX_INCOME)}.`;

  return (
    <Card className="requirement-form" highlight>
      <div className="card-head">
        <h3>Set Your Requirements</h3>
        <p className="flow-sub">Tell us what the lender needs.</p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span className="field-label">Minimum Monthly Income</span>
          <div className="input-prefix">
            <span className="input-prefix-char">₹</span>
            <input
              type="number"
              min={0}
              max={MAX_INCOME}
              value={incomeText}
              placeholder="e.g. 50000"
              onChange={(e) => {
                setIncomeText(e.target.value);
                setTouched(true);
                const next = Number(e.target.value);
                if (!Number.isNaN(next) && next >= 0 && next <= MAX_INCOME) {
                  onChange({
                    minimumIncome: next,
                    requireNoDefault,
                    lenderRef,
                  });
                }
              }}
              onBlur={() => setTouched(true)}
              aria-invalid={invalid || undefined}
            />
          </div>
          <span className="field-hint">Income required by the lender</span>
          <span className="field-example">Example: ₹50,000</span>
          {invalid && <span className="field-error">{error}</span>}
        </label>

        <label className="field check-field">
          <div className="field-label-row">
            <span className="field-label">Allow Previous Default?</span>
            <span className="tooltip-wrap">
              <InfoIcon size={14} className="tooltip-icon" />
              <span className="tooltip-box">
                When "Yes", applicants with a prior loan default are still eligible.
              </span>
            </span>
          </div>
          <div className="check-row">
            {(["No", "Yes"] as const).map((option) => {
              const value = option === "Yes";
              const selected = value === !requireNoDefault;
              return (
                <button
                  key={option}
                  type="button"
                  className={`seg-btn ${selected ? "selected" : ""} ${option === "Yes" && selected ? "warn-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() =>
                    onChange({
                      minimumIncome: income,
                      requireNoDefault: !value,
                      lenderRef,
                    })
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
          <span className="field-hint">
            {!requireNoDefault
              ? "Prior defaults are accepted"
              : "Applicants must have no prior loan defaults"}
          </span>
        </label>

        <label className="field">
          <div className="field-label-row">
            <span className="field-label">Lender Reference</span>
            <span className="field-optional">Optional</span>
          </div>
          <input
            type="text"
            value={lenderRef}
            placeholder="e.g. Your Bank Name"
            onChange={(e) =>
              onChange({
                minimumIncome: income,
                requireNoDefault,
                lenderRef: e.target.value,
              })
            }
          />
          <span className="field-hint">Helps identify this verification</span>
          <span className="field-example">Example: Your Bank Name</span>
        </label>
      </div>

      <p className="flow-note">
        <LockIcon size={15} />
        <span>Your financial data stays private.</span>
      </p>

      <div className="card-foot">
        <Button
          variant="primary"
          onClick={onContinue}
          disabled={invalid}
          icon={<ArrowRightIcon size={16} />}
        >
          {continueLabel}
        </Button>
      </div>
    </Card>
  );
}
