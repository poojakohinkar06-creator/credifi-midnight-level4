# CrediFi — Privacy-Preserving Loan Eligibility & Risk Verification on Midnight

CrediFi is a **Level 4 Midnight Builder** project. It lets a user prove to a
lender that a *verified* financial credential satisfies a lending requirement —
**income ≥ minimumIncome** and **no previous default** — without ever revealing
the exact income or the private financial history.

The eligibility evaluation runs entirely inside a **zero-knowledge circuit**.
Only the *outcome* (which requirements were satisfied and whether the user is
eligible) is written to the ledger. The exact income and the previous-default
flag are **witness-only** and never cross the private/public boundary.

> **Deployment status:** on-chain deployment on Midnight **Preprod** is
> documented but **not yet executed** — it requires a running proof server and a
> funded wallet (see [Deployment](./docs/deploy-onchain.md)). The contract
> address is **never fabricated**; it is a typed placeholder until a genuine
> deployment exists.

---

## Highlights

- **Private-by-design contract** written in [Compact](https://docs.midnight.network/compact),
  verified by 17 contract tests proving both the eligibility matrix **and** that
  witness inputs stay off-ledger.
- **Schnorr attestations over Jubjub** signed by a deterministic mock credential
  issuer and verified **inside the ZK circuit** (`schnorr.compact`).
- **Tamper-evident binding**: each credential is cryptographically bound to the
  holder's derived identity, so signatures cannot be replayed or reused.
- **Admin-guarded governance**: only the contract admin can register/remove
  trusted issuers (enforced in-circuit).
- **Demo web app** that runs the **official compiled contract** in-process to
  produce genuine results — no fabricated outcomes.
- **CI/CD** (.github/workflows) that compiles the contract, regenerates ZK
  bindings, and runs all tests/builds on every push.

---

## Repository layout

```
.
├── package.json               # npm workspaces + top-level scripts
├── contract/                  # Midnight smart contract (Compact)
│   ├── src/
│   │   ├── credifi.compact    # main CrediFi contract
│   │   ├── schnorr.compact    # Schnorr verification module
│   │   ├── witnesses.ts       # private-state witnesses
│   │   ├── mock-issuer.ts     # deterministic mock credential issuer
│   │   ├── config.ts          # Preprod runtime config
│   │   ├── deploy.ts          # honest deploy/verify preflight CLI
│   │   └── test/              # eligibility + privacy unit tests
│   └── tsconfig*.json
├── frontend/                  # React + Vite demo web app
│   └── src/
│       ├── engine.ts          # runs the compiled contract in-process
│       ├── App.tsx            # demo dashboard UI
│       ├── wallet.ts          # simulated wallet connectivity
│       └── test/              # engine + app smoke tests
├── docs/                      # setup, architecture, deployment
└── .github/workflows/ci.yml   # CI pipeline
```

> `contract/src/managed/` holds automatically generated Compact bindings and ZK
> artifacts and is **git-ignored** — regenerate with `npm run contract:compile`.

---

## Prerequisites

- **Node.js ≥ 22** and npm
- The **Compact devtools + compiler** (see [Installation](https://docs.midnight.network/getting-started/installation)):
  ```bash
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
  compact update 0.31.1   # match the contract language version
  ```
- For **on-chain** deployment only: a running proof server (Docker +
  `midnight_bn254`) and a funded Preprod wallet.

---

## Getting started

```bash
# 1. Install workspace dependencies
npm install

# 2. Compile the Compact contract (regenerates managed bindings + zkir)
npm run contract:compile

# 3. Run the contract tests (17 tests: eligibility + privacy)
npm run contract:test

# 4. Build both packages
npm run build

# 5. Run the frontend engine tests
npm run frontend:test

# 6. Start the demo web app
npm run frontend:dev
```

### Top-level scripts

| Script                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `npm run contract:compile` | Compile `contract.compact` into `src/managed`      |
| `npm run contract:test`    | Run the contract unit tests                        |
| `npm run contract:build`   | Build the contract package (tsc + copies artifacts) |
| `npm run frontend:test`    | Run the frontend engine + app tests                |
| `npm run frontend:build`   | Build the web app for production                   |
| `npm run build`            | Build both packages                                |
| `npm run deploy`           | Preflight for Preprod deployment (readiness report) |
| `npm run verify`           | Preflight + deploy-status report                   |

---

## How the privacy works

1. A trusted credential issuer signs the user's financial data
   (`monthlyIncome`, `previousDefault`, `holderHash`) with a Schnorr signature
   over Midnight's native Jubjub curve.
2. The user connects a wallet, supplies their (private) credential, and requests
   verification against a lender-defined requirement.
3. Inside the Midnight ZK circuit, CrediFi checks the issuer is registered and
   the signature is valid, then evaluates **income ≥ minimumIncome** and the
   no-default requirement — all on **private witnesses**.
4. Only the **binary eligibility summary** (boolean flags + the lender's own
   threshold) is disclosed and stored in the ledger, keyed by the holder's
   derived, unlinkable identity hash.

A user's exact income is never serialized into any ledger field, result record,
or proof. This is enforced and proven by the contract privacy tests.

---

## Documentation

- [Setup guide](./docs/setup.md) — detailed environment setup
- [Architecture](./docs/architecture.md) — contract, witnesses, engine design
- [MVP scope](./docs/mvp-scope.md) — the five attestation approaches delivered
- [Deployment (Preprod)](./docs/deploy-onchain.md) — how a real on-chain
  deployment is performed (proof-server prerequisites, wallet, wiring)

---

## Roadmap / deferred

- **Real on-chain deployment** on Preprod (proof server + funded wallet) and set
  `CONTRACT_ADDRESS`.
- **Lace wallet** integration for genuine on-chain submissions.
- Issuer runs as a trusted **backend service** (the mock issuer's deterministic
  secret is simulation-only and must never live in client code).

---

## Honesty note

This repository does **not** fabricate deployment results. Until a genuine
Preprod deployment exists, `CONTRACT_ADDRESS` is a typed placeholder and the
deploy CLI reports the true readiness state rather than emitting a fake address.
All results shown by the demo are computed by the **real compiled contract**, not
mocked.

## License

Private project — internal use for the Midnight Builder Level 4 milestone.
