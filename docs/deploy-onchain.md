# CrediFi — On-Chain Deployment (Midnight Preprod)

> **Status: NOT DEPLOYED YET.** This document describes exactly how a genuine
> on-chain deployment is performed. It is intentionally NOT executed here because
> it requires prerequisites this environment does not currently provide (a proof
> server needing Docker engine, and a funded Preprod wallet). **No contract
> address is fabricated** — `CONTRACT_ADDRESS` remains a placeholder until a real
> deployment exists (see `docs/contract-address.txt`).

## What a real deployment requires

1. **A running proof server** — `midnight_bn254` generates real ZK proofs on-device.
   It runs via Docker:
   ```bash
   docker run -p 6300:6300 midnightntwrk/proof-server:8.1.0 midnight-proof-server -v
   ```
   The CrediFi config points the client at `http://127.0.0.1:6300`
   (`PROOF_SERVER_URL` in `contract/src/config.ts`).
2. **Compiled ZK artifacts** — already generated in
   `contract/src/managed/credifi/zkir/` by `npm run contract:compile`.
3. **A reachable Preprod indexer** — `https://indexer.preprod.midnight.network/api/v4/graphql`
   (set in `contract/src/config.ts`).
4. **A funded Preprod wallet** — a `DEPLOYER_SEED` is pre-configured for the demo;
   the real deploy uses the operator's own funded wallet.

## The honest preflight CLI

`npm run deploy` runs a readiness preflight against all of the above and prints a
truthful report:

```
[CrediFi] Readiness report for network preprod
  compiled ZK artifacts : OK
  indexer reachable     : UNREACHABLE
  proof server reachable : UNREACHABLE (start midnight_bn254; needs Docker runtimes)
  deployable             : NO
```

If any precondition is unmet, the CLI **exits non-zero and submits nothing** —
it never emits a fake contract address.

## Steps once the proof server + wallet are available

1. Start the proof server (Docker) and confirm `http://127.0.0.1:6300/health`.
2. `npm run contract:compile` to ensure the zkir artifacts match the source.
3. Wire the provider stack required by `midnight-js-contracts 4.x`:
   wallet provider → midnight provider (`HttpClientProofProvider` pointing at the
   proof server) → indexer public-data provider → level private-state provider,
   and bind the contract with the effect-style compiled-contract adapter.
4. Deploy using a funded wallet and capture the **real** contract address.
5. Paste the real address into `CONTRACT_ADDRESS` in `contract/src/config.ts`
   and `frontend/src/config.ts`, and record it in `docs/contract-address.txt`.
6. Verify on-chain via `npm run verify`.

## What is NOT done here

- ❌ No `CONTRACT_ADDRESS` is filled with a made-up value.
- ❌ No "deployed successfully" claim is made without a real transaction.
- ❌ No proof server is assumed to be running when it is not.

This keeps the repository honest: every result the app or tests show is computed
by the real compiled contract, and any deployment claim reflects a genuine
on-chain state.
