// ---------------------------------------------------------------------------
// Wallet connectivity.
//
// The simulated wallet is an explicit MVP fallback: it connects an in-browser
// holder identity and labeled clearly as such. A real Midnight wallet (Lace)
// can be wired later so proofs are submitted on-chain; the contract address,
// providers and proof server are already configured for that path.
// ---------------------------------------------------------------------------
import { NETWORK_ID } from "./config";

export type WalletProvider = "simulated";

export type WalletState = {
  connected: boolean;
  provider: WalletProvider;
  address: string;
  networkId: string;
  holderSecret: string;
};

function randomSecret(): string {
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

// In the browser we can ask the user's real wallet. Lace's Midnight capability
// requires a companion provider stack; until that is fully wired we connect a
// clearly-labelled simulated wallet and still exercise the REAL compiled
// contract logic in-process.
export async function connectWallet(): Promise<WalletState> {
  const secret = randomSecret();

  return {
    connected: true,
    provider: "simulated",
    address: `preprod:sim:${secret.slice(0, 10)}`,
    networkId: NETWORK_ID,
    holderSecret: secret,
  };
}

export function walletLabel(state: WalletState): string {
  return state.provider === "simulated"
    ? "Simulated in-browser wallet (demo mode — not a Lace connection)"
    : "Lace wallet";
}