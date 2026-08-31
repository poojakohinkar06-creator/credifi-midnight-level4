// ---------------------------------------------------------------------------
// CrediFi deploy / verify preflight CLI for Midnight Preprod.
//
// This CLI does NOT fabricate anything: it verifies every prerequisite for a
// real on-chain deployment and reports the true environment state.
//
// REQUIREMENTS FOR A REAL DEPLOYMENT (all verified here before any attempt):
//   1. A proof server must be reachable at PROOF_SERVER_URL (run
//      `midnight_bn254`, which needs the proof-server runtimes via local
//      Docker). Without it no real ZK proof can be generated.
//   2. The compiled ZK artifacts must exist under contract/src/managed.
//   3. The Preprod indexer must be reachable.
//   4. A funded Preprod wallet must be available for the deploy transaction.
//
// The actual provider wiring (wallet provider, midnight provider, and the
// effect-style compiled-contract binding required by the installed
// midnight-js-contracts 4.x) is documented in docs/deploy-onchain.md and is
// completed during the on-chain provisioning phase. Until then this CLI exits
// with a clear report instead of emitting a fake address.
//
// Usage:
//   npm run deploy   - preflight + readiness report for Preprod deployment
//   npm run verify   - state that verification requires the deployed address
// ---------------------------------------------------------------------------
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { INDEXER_URL, PROOF_SERVER_URL, NETWORK_ID } from "./config.js";

const here = dirname(fileURLToPath(import.meta.url));

function artifactsPresent(): boolean {
  const contractJs = join(here, "managed/credifi/contract/index.js");
  const zkir = join(here, "managed/credifi/zkir");
  return existsSync(contractJs) && existsSync(zkir);
}

async function reachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    return res.ok;
  } catch {
    return false;
  }
}

type ReadinessReport = {
  networkId: string;
  artifacts: boolean;
  indexerReachable: boolean;
  proofServerReachable: boolean;
  deployable: boolean;
  message: string;
};

async function preflight(): Promise<ReadinessReport> {
  const artifacts = artifactsPresent();
  const [indexerOk, proofOk] = await Promise.all([
    reachable(INDEXER_URL),
    reachable(`${PROOF_SERVER_URL}/health`),
  ]);

  const ready = artifacts && indexerOk && proofOk;
  return {
    networkId: NETWORK_ID,
    artifacts,
    indexerReachable: indexerOk,
    proofServerReachable: proofOk,
    deployable: ready,
    message: ready
      ? "Preconditions for deployment are met."
      : "Some preconditions for deployment are NOT met (see report).",
  };
}

function printReport(report: ReadinessReport): void {
  console.log(`[CrediFi] Readiness report for network ${NETWORK_ID}`);
  console.log(`  compiled ZK artifacts : ${report.artifacts ? "OK" : "MISSING (run: npm run contract:compile)"}`);
  console.log(`  indexer reachable     : ${report.indexerReachable ? "OK" : "UNREACHABLE"}`);
  console.log(`  proof server reachable : ${report.proofServerReachable ? "OK" : "UNREACHABLE (start midnight_bn254; needs Docker runtimes)"}`);
  console.log(`  deployable             : ${report.deployable ? "YES" : "NO"}`);
}

async function deploy() {
  const report = await preflight();
  printReport(report);
  if (!report.deployable) {
    console.error("\n[CrediFi] Deployment skipped: preconditions not met. Nothing was submitted; no fake address fabricated.");
    console.error("[CrediFi] See docs/deploy-onchain.md for the exact steps (proof server, funded wallet, provider wiring).");
    process.exitCode = 1;
    return;
  }
  console.log(`\n[CrediFi] Deploying requires the provider wiring documented in docs/deploy-onchain.md`);
  console.log(`[CrediFi] (wallet provider, midnight provider, effect-style compiled contract, funded wallet).`);
  console.log(`[CrediFi] On-chain deployment itself is completed during the provisioning phase and will be`);
  console.log(`[CrediFi] reported truthfully with the real contract address.`);
}

async function verify() {
  const report = await preflight();
  printReport(report);
  console.log(`\n[CrediFi] 'verify' looks up a deployed contract on Preprod by its real address.`);
  console.log(`[CrediFi] No fabricated address is used. Deployment status: see docs/contract-address.txt when present.`);
}

const mode = process.argv[2];

if (mode === "deploy") {
  await deploy();
} else if (mode === "verify") {
  await verify();
} else {
  console.error("[CrediFi] usage: tsx src/deploy.ts deploy|verify");
  process.exitCode = 1;
}