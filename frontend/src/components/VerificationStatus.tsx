import { Card } from "./Card";
import { Button } from "./Button";
import { InfoIcon, LockIcon } from "./Icons";

type VerificationStatusProps = {
  isVerifying: boolean;
  error: string | null;
  onRun: () => void;
  disabled?: boolean;
};

export function VerificationStatus({ isVerifying, error, onRun, disabled = false }: VerificationStatusProps) {
  return (
    <Card className="verification-card">
      <div className="card-head">
        <h3>Verify Your Eligibility</h3>
        <p className="card-sub">We'll check your requirements privately.</p>
      </div>

      <div className="privacy-card">
        <span className="privacy-card-icon" aria-hidden>
          <LockIcon size={20} />
        </span>
        <div>
          <h4>Private Verification</h4>
          <p>
            Your financial details are used to create a proof. The actual values are not shared with
            the lender.
          </p>
        </div>
      </div>

      {isVerifying ? (
        <div className="verifying" role="status">
          <span className="pulse-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <p>Verifying privately…</p>
          <span className="verifying-sub">Creating your privacy-preserving proof.</span>
        </div>
      ) : (
        <div className="card-foot">
          <Button
            variant="primary"
            size="lg"
            onClick={onRun}
            disabled={disabled}
            icon={<LockIcon size={16} />}
          >
            {disabled ? "Connect wallet to continue" : "Verify Privately →"}
          </Button>
        </div>
      )}

      {error && (
        <p className="verification-error" role="alert">
          <InfoIcon size={15} />
          <span>Verification failed: {error}</span>
        </p>
      )}
    </Card>
  );
}
