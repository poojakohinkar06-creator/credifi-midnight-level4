import type { VerificationOutcome } from "../engine";
import { Card } from "./Card";
import { Button } from "./Button";
import { CheckIcon, LockIcon, XIcon } from "./Icons";

type EligibilityResultProps = {
  outcome: VerificationOutcome;
  onRestart: () => void;
};

export function EligibilityResult({ outcome, onRestart }: EligibilityResultProps) {
  const eligible = outcome.eligible;

  return (
    <div className="result-wrap">
      <div className={`result-hero ${eligible ? "is-eligible" : "is-declined"}`}>
        <span className={`result-check-circle ${eligible ? "ok" : "no"}`} aria-hidden>
          {eligible ? <CheckIcon size={34} /> : <XIcon size={30} />}
        </span>
        <h3>{eligible ? "You're Eligible" : "Not Eligible"}</h3>
        <p>
          {eligible
            ? "You meet the lender's requirements."
            : "You don't meet all the required conditions."}
        </p>
      </div>

      <Card className="privacy-status-card">
        <div className="privacy-status-head">
          <span className="privacy-status-icon" aria-hidden>
            <LockIcon size={20} />
          </span>
          <p className="privacy-status-note">
            Your financial details remain private. Only the eligibility result is shared.
          </p>
        </div>
      </Card>

      {outcome.lenderRef && (
        <p className="result-meta">
          Reference: {outcome.lenderRef} · Result {outcome.resultId} · Holder{" "}
          <span className="mono">{outcome.holderAddressHash.slice(0, 10)}…</span>
        </p>
      )}

      <div className="card-foot row">
        <Button variant="outline" onClick={onRestart}>
          Start Over
        </Button>
      </div>
    </div>
  );
}
