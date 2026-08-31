// ---------------------------------------------------------------------------
// Runtime configuration for CrediFi on Midnight's Preprod network.
//
// These values match Midnight's published Preprod endpoints. The proof server
// (added via PROOF_SERVER_URL) is produced by the `midnight_bn254` binary and
// must be running locally before any deployment or on-chain verification.
// ---------------------------------------------------------------------------

export const CREDIFI_CONTRACT_PATH = new URL("./managed/credifi/contract/index.js", import.meta.url).toString();
export const CREDIFI_COMPILED_PATH = new URL("./managed/credifi/zkir", import.meta.url).toString();

// Midnight network. Preprod is the public test network used for this MVP.
export const NETWORK_ID = "preprod";

// Midnight official Preprod indexer endpoint.
export const INDEXER_URL = "https://indexer.preprod.midnight.network/api/v4/graphql";

// Locally-run Midnight proof server (start with `midnight_bn254`), the piece
// required to generate real ZK proofs on-device.
export const PROOF_SERVER_HOST = "127.0.0.1";
export const PROOF_SERVER_PORT = 6300;
export const PROOF_SERVER_URL = `http://${PROOF_SERVER_HOST}:${PROOF_SERVER_PORT}`;

/**
 * The on-chain address of the deployed CrediFi contract on Preprod.
 *
 * MANUAL ACTION REQUIRED: after running `npm run deploy` (which needs the proof
 * server running), paste the real contract address here. This value is NEVER
 * fabricated — it is left as a typed placeholder until a genuine deployment
 * exists.
 */
export const CONTRACT_ADDRESS: string = "TODO_PASTE_DEPLOYED_CONTRACT_ADDRESS_AFTER_DEPLOY";

// The seed is used to derive the deployer's private key for the demo. In a real
// deployment this comes from the user's own wallet. For local off-chain testing
// any well-formed word list works since no real funds are involved.
export const DEPLOYER_SEED =
  "Audit credential privacy before extending any credit according to the wisest possible standards.";

// CrediFi demo constants shared across components and tests.
export const MOCK_ISSUER_ID = 1n;
export const DEFAULT_MINIMUM_INCOME = 50000n;
export const DEFAULT_LENDER_REF = "Midnight Lending Co";