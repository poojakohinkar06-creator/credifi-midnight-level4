import { useState } from "react";
import { CrediFiEngine } from "./engine";
import { connectWallet, walletLabel, type WalletState } from "./wallet";
import { CONTRACT_ADDRESS, DEFAULT_LENDER_REF, NETWORK_ID, MOCK_ISSUER_NAME } from "./config";

type Screen = "landing" | "credential" | "requirement" | "result";

export default function App() {
  const [engine] = useState(() => new CrediFiEngine());
  const [screen, setScreen] = useState<Screen>("landing");
  const [wallet, setWallet] = useState<WalletState | null>(null);

  const [monthlyIncome, setMonthlyIncome] = useState(65000);
  const [previousDefault, setPreviousDefault] = useState(false);

  const [minimumIncome, setMinimumIncome] = useState(50000);
  const [requireNoDefault, setRequireNoDefault] = useState(true);
  const [lenderRef, setLenderRef] = useState(DEFAULT_LENDER_REF);

  const [outcome, setOutcome] = useState<ReturnType<CrediFiEngine["verify"]> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connected = wallet !== null;

  async function handleConnect() {
    const state = await connectWallet();
    setWallet(state);
    setScreen("credential");
  }

  function handleVerify() {
    setError(null);
    try {
      const result = engine.verify(
        { monthlyIncome, previousDefault },
        { minimumIncome, requireNoDefault, lenderRef },
        wallet?.holderSecret ?? "demo-holder",
      );
      setOutcome(result);
      setScreen("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Midnight Network • Level 4 Builder</p>
          <h1>CrediFi</h1>
          <p className="tagline">
            Privacy-preserving loan eligibility &amp; risk verification.
            Lenders learn <em>yes/no</em>; your income never leaves your device.
          </p>
        </div>
        <div className="hero-badges">
          <span className="badge badge-network">{NETWORK_ID}</span>
          <span className="badge badge-private">ZK private</span>
          <span className="badge badge-zk">5 attestation approaches</span>
        </div>
      </header>

      {error && (
        <div className="banner banner-error" role="alert">
          Verification failed: {error}
        </div>
      )}

      <section className="steps">
        {/* 1. Wallet */}
        <article className={`card ${screen === "landing" ? "active" : ""}`}>
          <h2>
            <span className="step">1</span> Connect wallet
          </h2>
          {!connected ? (
            <button className="btn btn-primary" onClick={handleConnect}>
              Connect wallet
            </button>
          ) : (
            <div className="detail">
              <dl>
                <dt>Address</dt>
                <dd className="mono">{wallet.address}</dd>
                <dt>Provider</dt>
                <dd>{walletLabel(wallet)}</dd>
              </dl>
              <p className="note">
                Demo credentials derived in-browser. A real Lace wallet submission would
                require the proof server to be running; see the deployment docs.
              </p>
            </div>
          )}
        </article>

        {/* 2. Credential */}
        <article className={`card ${screen === "credential" ? "active" : ""}`}>
          <h2>
            <span className="step">2</span> Your financial credential
          </h2>
          <p className="subtitle">
            Signed by: <code>{MOCK_ISSUER_NAME}</code>. These fields stay <strong>private</strong> —
            they are only used as circuit witnesses.
          </p>
          <div className="form-grid">
            <label>
              Gross monthly income
              <input
                type="number"
                min={0}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              />
              <small>PRIVATE witness — never disclosed</small>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={previousDefault}
                onChange={(e) => setPreviousDefault(e.target.checked)}
              />
              I have previously defaulted on a loan
            </label>
          </div>
          {screen === "credential" && (
            <div className="row">
              <button className="btn" onClick={() => setScreen("requirement")}>
                I have a signed credential →
              </button>
            </div>
          )}
        </article>

        {/* 3. Lender request */}
        <article className={`card ${screen === "requirement" ? "active" : ""}`}>
          <h2>
            <span className="step">3</span> Lender verification request
          </h2>
          <div className="form-grid">
            <label>
              Minimum monthly income (threshold)
              <input
                type="number"
                min={0}
                value={minimumIncome}
                onChange={(e) => setMinimumIncome(Number(e.target.value))}
              />
            </label>
            <label className="check">
              <input type="checkbox" checked={requireNoDefault} onChange={(e) => setRequireNoDefault(e.target.checked)} />
              Require no prior default
            </label>
            <label>
              Lender reference
              <input value={lenderRef} onChange={(e) => setLenderRef(e.target.value)} />
            </label>
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={handleVerify}>
              Run ZK verification
            </button>
          </div>
          <p className="note">
            The Exact Income is never sent anywhere: only the boolean outcome becomes public,
            stored in the contract under your derived holder identity.
          </p>
        </article>

        {/* 4 + 5. Proof / outcome, about */}
        <article className={`card ${screen === "result" ? "active" : ""}`}>
          <h2>
            <span className="step">4 / 5</span> Outcome, proof &amp; about
          </h2>

          {outcome ? (
            <div className={`result ${outcome.eligible ? "eligible" : "declined"}`}>
              <p className="verdict">{outcome.eligible ? "ELIGIBLE" : "NOT ELIGIBLE"}</p>
              <dl>
                <dt>Income threshold met</dt>
                <dd>{outcome.incomeSatisfied ? "Yes" : "No"}</dd>
                <dt>No-prior-default requirement met</dt>
                <dd>{outcome.defaultRequirementSatisfied ? "Yes" : "No"}</dd>
                <dt>Threshold requested</dt>
                <dd>
                  ${outcome.minimumIncome} / month{outcome.requireNoDefault ? " (no prior default)" : ""}
                </dd>
                <dt>Lender reference</dt>
                <dd>{outcome.lenderRef}</dd>
                <dt>Holder identity (hash)</dt>
                <dd className="mono">{outcome.holderAddressHash.slice(0, 24)}…</dd>
              </dl>
              <p className="proof-line">Computed by: {outcome.computedBy}</p>
              <p className="note">
                Your exact income (<code>${monthlyIncome.toLocaleString()} / month</code>) and default
                flag never appear in any result record, ledger field, or proof — they were witness-only.
              </p>
            </div>
          ) : (
            <p className="note">No verification has been run yet.</p>
          )}

          <div className="about">
            <h3>How the privacy works</h3>
            <ul>
              <li>
                Your income + default history are signed by a trusted issuer and fed into a Midnight
                ZK circuit as <strong>witnesses</strong>.
              </li>
              <li>
                The on-chain contract stores only the binary eligibility summary the lender requested:
                booleans and the threshold.
              </li>
              <li>
                The demo runs the <em>official compiled contract</em> in-process for verifiability;
                no fabricated or mocked results are produced.
              </li>
            </ul>
            <h3>Deployment status</h3>
            <p className="note">
              {CONTRACT_ADDRESS.startsWith("TODO")
                ? "On-chain deployment on Midnight Preprod requires a running proof server and funded wallet — pending (see docs/deploy). Contract address is NOT fabricated."
                : `Contract deployed on Preprod at ${CONTRACT_ADDRESS}`}
            </p>
            <p className="note">
              MVP scope: 5 attestation approaches (private income check, default check, eligibility
              decision, multi-lender verification records, and tamper-evident credential binding —
              see docs/mvp-scope.md).
            </p>
          </div>

          <div className="row">
            <button className="btn" onClick={() => { setScreen("requirement"); setOutcome(null); setWallet(null); }}>
              Reset demo
            </button>
          </div>
        </article>
      </section>

      <footer>
        <p>
          CrediFi — Privacy-preserving loan eligibility &amp; risk verification on the Midnight
          Network. Results in this demo are computed by the compiled contract logic, never
          fabricated.
        </p>
      </footer>
    </main>
  );
}