import { useState } from "react";
import { CrediFiEngine } from "./engine";
import { connectWallet, WalletError, type WalletErrorCode, type WalletState } from "./wallet";
import { DEFAULT_LENDER_REF, MOCK_ISSUER_NAME } from "./config";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { PrivacySection } from "./components/PrivacySection";
import { Footer } from "./components/Footer";
import { ProgressSteps, type StepKey } from "./components/ProgressSteps";
import { WalletStatus } from "./components/WalletStatus";
import { CredentialCard } from "./components/CredentialCard";
import { RequirementForm } from "./components/RequirementForm";
import { VerificationStatus } from "./components/VerificationStatus";
import { EligibilityResult } from "./components/EligibilityResult";
import { Card } from "./components/Card";

import type { VerificationOutcome } from "./engine";

type Screen = "landing" | "credential" | "requirement" | "verifying" | "result";

const stepOf: Record<Screen, StepKey> = {
  landing: "credential",
  credential: "credential",
  requirement: "requirement",
  verifying: "verifying",
  result: "result",
};

export default function App() {
  const [engine] = useState(() => new CrediFiEngine());
  const [screen, setScreen] = useState<Screen>("landing");
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [walletError, setWalletError] = useState<{ code: WalletErrorCode; message: string } | null>(null);

  // Private credential witness values (never displayed as public amounts).
  const [monthlyIncome, setMonthlyIncome] = useState(65000);
  const [previousDefault, setPreviousDefault] = useState(false);

  // Lender-facing requirements (public).
  const [minimumIncome, setMinimumIncome] = useState(50000);
  const [requireNoDefault, setRequireNoDefault] = useState(true);
  const [lenderRef, setLenderRef] = useState(DEFAULT_LENDER_REF);

  const [outcome, setOutcome] = useState<VerificationOutcome | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connected = wallet !== null;
  const currentStep = stepOf[screen];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleConnect() {
    if (isConnecting || connected) return;
    setIsConnecting(true);
    setWalletError(null);
    setError(null);
    try {
      const state = await connectWallet();
      setWallet(state);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      const code = e instanceof WalletError ? e.code : "connection-error";
      setWalletError({ code, message });
      setError(message);
    } finally {
      setIsConnecting(false);
    }
  }

  function handleDisconnect() {
    setWallet(null);
    setOutcome(null);
    setWalletError(null);
    setError(null);
    setScreen("credential");
  }

  function handleStart() {
    setScreen("credential");
    scrollTo("verification");
  }

  function handleHowItWorks() {
    scrollTo("how-it-works");
  }

  function handleRunVerification() {
    if (!connected || !wallet) {
      setError("Connect a wallet to continue.");
      scrollTo("verification");
      return;
    }
    setError(null);
    setIsVerifying(true);
    setScreen("verifying");
    void (async () => {
      try {
        // Brief, deliberate pause so the processing state is visible. The
        // eligibility result itself is NEVER faked — it comes from running the
        // real compiled CrediFi contract circuit below.
        await new Promise((r) => setTimeout(r, 1000));
        const result = engine.verify(
          { monthlyIncome, previousDefault },
          { minimumIncome, requireNoDefault, lenderRef },
          wallet.address,
        );
        setOutcome(result);
        setIsVerifying(false);
        setScreen("result");
        scrollTo("verification");
      } catch (e) {
        setIsVerifying(false);
        setScreen("verifying");
        setError(e instanceof Error ? e.message : String(e));
        scrollTo("verification");
      }
    })();
  }

  function handleRestart() {
    setOutcome(null);
    setError(null);
    setMinimumIncome(50000);
    setRequireNoDefault(true);
    setMonthlyIncome(65000);
    setPreviousDefault(false);
    setScreen("credential");
    scrollTo("verification");
  }

  const deploymentNote = "On-chain deployment on Midnight Preprod is pending (needs a proof server and funded wallet). Contract address is not fabricated.";

  return (
    <div className="app" id="app">
      <Navbar
        wallet={wallet}
        connected={connected}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        activeSection={screen === "landing" ? "" : "verification"}
      />

      <Hero onStart={handleStart} onHowItWorks={handleHowItWorks} />

      <HowItWorks />

      {/* Guided verification flow */}
      <section className="section flow-section" id="verification">
        <div className="section-head">
          <p className="eyebrow">Guided verification</p>
          <h2>Guided Verification Flow</h2>
        </div>

        {error && (
          <div className="banner banner-error" role="alert">
            <span>{error}</span>
          </div>
        )}

        <WalletStatus
          wallet={wallet}
          connected={connected}
          isConnecting={isConnecting}
          error={walletError}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />

        <ProgressSteps current={currentStep} />

        <div className="flow-panels">
          <div className={`flow-panel ${currentStep === "credential" ? "is-active" : ""}`}>
            <CredentialCard
              issuerName={MOCK_ISSUER_NAME}
              verified
              monthlyIncome={monthlyIncome}
              previousDefault={previousDefault}
              onIncomeChange={(v) => {
                setMonthlyIncome(Number.isNaN(v) || v < 0 ? 0 : v);
                setOutcome(null);
              }}
              onDefaultChange={(v) => {
                setPreviousDefault(v);
                setOutcome(null);
              }}
              onContinue={() => setScreen("requirement")}
            />
          </div>

          <div className={`flow-panel ${currentStep === "requirement" ? "is-active" : ""}`}>
            <RequirementForm
              minimumIncome={minimumIncome}
              requireNoDefault={requireNoDefault}
              lenderRef={lenderRef}
              onChange={(u) => {
                setMinimumIncome(u.minimumIncome);
                setRequireNoDefault(u.requireNoDefault);
                setLenderRef(u.lenderRef);
                setOutcome(null);
              }}
              onContinue={handleRunVerification}
            />
          </div>

          <div className={`flow-panel ${currentStep === "verifying" ? "is-active" : ""}`}>
            <VerificationStatus
              isVerifying={isVerifying}
              error={screen === "verifying" ? error : null}
              onRun={handleRunVerification}
              disabled={!connected}
            />
          </div>

          <div className={`flow-panel ${currentStep === "result" ? "is-active" : ""}`}>
            {outcome ? (
              <EligibilityResult outcome={outcome} onRestart={handleRestart} />
            ) : (
              <Card className="result-empty">
                <h3>Result</h3>
                <p>No verification has been run yet. Complete the flow to see your eligibility result.</p>
              </Card>
            )}
          </div>
        </div>
      </section>

      <PrivacySection />

      <Footer deploymentNote={deploymentNote} />
    </div>
  );
}
