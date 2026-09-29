# CrediFi Level 5 — User Feedback

Level 5 user-feedback record for CrediFi: how feedback was collected, what
testers actually said, the exact counts taken from the response export, and —
critically — **which product changes can and cannot be attributed to it in the
git history.**

| Section | Evidence class |
| --- | --- |
| [Feedback collection](#feedback-collection), [quantitative summary](#quantitative-summary) | Derived from the form export, reproducible in-repo |
| [What We Changed](#what-we-changed) | Cross-checked against `git log` and the source files |
| [Commit evidence](#commit-evidence) | Repository-based, reproducible with `git` |
| [Wallet verification](#wallet-verification-evidence-boundary) | External (Subscan), a manual check recorded as a 53/3 aggregate |

- **Test users and wallets:** [`USERS.md`](../USERS.md)
- **Usage guide:** [`docs/USAGE.md`](./USAGE.md)

---

## Feedback collection

- Feedback was collected through the **CrediFi Level 5 Google Form**, which
  captured: timestamp, email, whether the tester owns a 1AM Wallet, their
  Preprod wallet address, whether the wallet connected, how easy connection was,
  how easy the eligibility verification was, how clear the result was, whether
  the privacy concept was understandable, the single most important improvement
  they would suggest, an overall 1–5 rating, a recommendation question, and a
  free-text comments box.
  > **Note on numbering.** The sheet's own question labels are offset by one
  > from this document, because its first question is the email address. The
  > sheet's *"Q1. Email Address"* is the address prompt, so the sheet's
  > *"Q2. Do you have a 1AM Wallet?"* is the **Q2** referred to below. The
  > headings here match the sheet's own wording verbatim to avoid ambiguity.
- Responses are stored in the accompanying **Google Sheet**, which is the
  external source of truth for this data:
  <https://docs.google.com/spreadsheets/d/1yYpRJhoTLcjaDhWp4KIBGeo7d0WnhsDOUtQmGLtmjI8/edit?usp=sharing>
- **Source export used for this document — the sole source of truth:**
  `_CrediFi — Level 5 Preprod User Feedback Form  (Responses) (2).xlsx`. It
  contains **56 data rows**, **0 blank rows**, and therefore **56 non-blank
  responses**, every one with a non-empty wallet address and a non-empty email.
  All 56 addresses are **unique**; all 56 submitter emails are unique.
- **Testing window:** 2026-09-15 12:04:20 → 2026-09-29 18:47:21 (form
  timestamps; the form records no timezone).

### Older exports — historical, and not used in any statistic below

Three older snapshots of the same form exist. They were reconciled against the
current export and then set aside. **Every count on this page comes from the
current export only.**

| Export | Non-blank | Unique emails | Unique addresses | Duplicate addresses |
| --- | --- | --- | --- | --- |
| `(Responses).xlsx` (oldest) | 51 | 50 | 51 | 0 |
| `(Responses) (1).xlsx` | 56 | 55 | 55 | 1 |
| **`(Responses) (2).xlsx` — current, used here** | **56** | **56** | **56** | **0** |
| `Form Responses 1.csv` | 51 | 50 | 50 | 1 |

The current export is authoritative because it *corrected* two data errors, not
merely because it is newest:

- `(1).xlsx` had one address duplicated across two different submitters
  (`poojakohinkar06@…` and `sarthakweb3@…`, same wallet string). The current
  export gives the second submitter a distinct address.
- The same snapshot had one row's email as `pranitasakat2008@gmail.com`; the
  current export reads `vaishnavijawale403@gmail.com`, same timestamp, same
  wallet.

**One answer appears only in the oldest export** and is flagged as historical
wherever it is mentioned below: the improvement answer *"Improve Frontend"*.
The row carrying it (identical timestamp, `dnyaneshwaribadhe2323@gmail.com`)
answers *"No"* in the current export, so it is **not** counted as a current
request.

> **Counting basis.** Every statistic below is calculated from the **56
> non-blank response rows** of the current export. The ratings are stored by
> Google Forms as `"5.0"`, `"4.0"` and so on; they are shown here as `5`, `4`.

---

## Quantitative summary

### Closed-form questions

| Question | Response | Count |
| --- | --- | --- |
| Q2. Do you have a 1AM Wallet? | Yes, I have a 1AM Wallet | 56 / 56 |
| Q4. Did you connect your wallet successfully? | Yes | **56 / 56** |
| Q8. Was the privacy concept of CrediFi easy to understand? | Yes | **56 / 56** |
| Q11. Would you recommend CrediFi to another user for testing? | Definitely | 54 |
| Q11. Would you recommend CrediFi to another user for testing? | Probably | 1 |
| Q11. Would you recommend CrediFi to another user for testing? | No | 1 |

### Rating questions (1–5)

| Question | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| Q5. How easy was it to connect your wallet? | 0 | 1 | 0 | 1 | **54** |
| Q6. How easy was the eligibility verification process? | 1 | 0 | 0 | 4 | **51** |
| Q10. How would you rate your overall CrediFi experience? | 1 | 0 | 0 | 1 | **54** |

### Result clarity

| Question | Response | Count |
| --- | --- | --- |
| Q7. Was your eligibility result easy to understand? | Yes, very clear | **52** |
| Q7. Was your eligibility result easy to understand? | Mostly clear | 4 |
| Q7. Was your eligibility result easy to understand? | No / unclear | 0 |

### Outliers worth acting on

The three low ratings all belong to **one respondent (response #35)**, not to
three different people:

| Field | Response #35 | Field average |
| --- | --- | --- |
| Q5 — how easy to connect the wallet | **2 / 5** | 4.9 |
| Q6 — how easy the eligibility verification was | **1 / 5** | 4.8 |
| Q10 — overall CrediFi experience | **1 / 5** | 4.9 |

This row is worth reading closely, because it is internally interesting: the
same respondent rated every *difficulty* question at the bottom of the scale,
yet still answered *"Yes, very clear"* to result clarity and **"Definitely"**
to the recommendation question. That pattern is consistent with someone who
found the flow slow or confusing but still understood the output and would
recommend the product. It is **one** data point, so it should not be
over-generalised — but it is the clearest single signal in the export that
onboarding and first-run guidance need work, which matches the two improvement
requests exactly.

Separately, **4** respondents (#1, #30, #33, #54) found the result only
*"Mostly clear"*. This is the largest single area of mild dissatisfaction in the
data, and it is the one the improvement requests also point at.

### The improvement question, in full

The *"What is the most important improvement you would suggest?"* column is
almost entirely a decline, so the raw distribution is given here rather than
only the extract. Across 56 responses there are 14 distinct answers:

| Answer | Count |
| --- | --- |
| `No` / `no` / `NO` (any capitalisation) | 39 |
| `Nothing` / `nothing` | 8 |
| `All good` / `all is good nothing to improve` | 2 |
| `No suggest.` | 1 |
| `No such improvement for now` | 1 |
| `NA` | 1 |
| `NO ITS GOOD` | 1 |
| `null` *(the literal word typed into the field)* | 1 |
| **A genuine request — progress indicator / more guidance** | **2** |
| **Total** | **56** |

So **54 of 56 declined to suggest an improvement, and 2 asked for the same
thing**: better progress feedback during verification.

> `null` is counted as a decline because it is a literal string in the cell, not
> an empty one — the cell is non-empty. Counting it either way does not change
> the 54/56 headline.

---

## What We Heard

Only feedback that actually appears in the export is summarised here. The
improvement column was **declined by 54 of 56 respondents** — the vast majority
wrote "No", "Nothing", "All good" or similar. Only **2** respondents proposed
an actual improvement, and both asked for the same thing. Two further requests
appear in the free-text comments box.

### What went well

- **Connection worked for every respondent who answered the question** — 56/56
  reported a successful wallet connection.
- **Connecting was easy for almost everyone** — 54/56 rated it 5/5.
- **Verification was easy for the large majority** — 51/56 rated it 5/5.
- **The result was clear** — 52/56 said "Yes, very clear" and 4 said "Mostly
  clear". Nobody found it unclear.
- **The privacy concept landed with everyone** — 56/56 said it was easy to
  understand.
- **Overall experience was strong** — 54/56 rated it 5/5, and 55/56 would
  recommend CrediFi (54 "Definitely" + 1 "Probably").
- Free-text comments repeatedly praised the interface, e.g. *"Frontend is very
  user friendly"*, *"Simple and user-friendly interface."*, *"result shows very
  clear"*, *"Good application"*, *"Great work.!"*.

### User-requested improvements

**Only 2 respondents made a request in the improvement question, and both asked
for the same thing.** Two more requests appear in the free-text comments box.
They are reported at their true weight — these are **four individual comments,
not four recurring themes**:

**From the improvement question (2 respondents):**

1. **Response #2 — progress indicator and brief guidance.**
   *"Add a simple progress indicator and brief guidance during verification."*
2. **Response #5 — more guidance and feedback.**
   *"The process is already smooth; adding a little more guidance and feedback
   during verification would make the experience even better."*
   Note this respondent opened by calling the process *already smooth* — the
   request is for polish, not for a fix.

**From the free-text comments box (2 respondents):**

3. **Response #13 — clearer guidance for first-time users.**
   *"It would be helpful to have clearer guidance or instructions for first-time
   users."*
4. **Response #10 — clearer privacy policy and data-security detail.**
   *"…It would build even more trust if the privacy policy and data security
   details were highlighted more clearly on the application page. Great job
   overall."*

So all four converge on one theme: **guidance during first-run verification**,
with one adjacent request to surface the privacy/data-security story more
prominently. Nothing in the export requests a new feature.

**One further request appears in an older export only (historical):** in the
oldest export, one respondent's improvement answer was *"Improve Frontend"*. In
the current 56-response export the same row — same timestamp, same submitter —
answers *"No"*. The current export is authoritative, so *"Improve Frontend"* is
**not** counted as a current request anywhere on this page.

### The signal in the ratings vs. the free text

The most useful finding is the **gap** between the numbers and the comments. The
ratings are near-ceiling (56/56 connected, 56/56 understood the privacy model),
yet a handful of people still asked for progress feedback and clearer first-time
guidance. That is a **guidance and orientation problem, not a core-functionality
problem** — which is exactly why a "Revisions Needed" outcome should not be read
as a broken app, and also exactly why the guidance requests are the ones worth
acting on.

---

## What We Changed

**This section is cross-checked against the actual git history and the actual
source files. Nothing below is claimed to be feedback-driven unless the history
proves it.**

### Commit evidence

Measured from the repository, not from a README claim:

```bash
$ git rev-list --count HEAD
28
```

| Measure | Value |
| --- | --- |
| Total commits reachable from `HEAD` | **28** |
| Merge commits | 0 (`git rev-list --count --no-merges HEAD` = 28) |
| Level 5 requirement | 20 |
| **Meets the 20-commit requirement** | **Yes — 28** |

Composition of the 28 commits (each commit is counted in exactly one row, by
its dominant change; this split sums to 28):

| Category | Commits | IDs |
| --- | --- | --- |
| Application / contract / test code | 9 | `505dc52`, `0dff123`, `cea6c51`, `de362f0`, `d41e572`, `e908bfc`, `15e97d3`, `7153fbe`, `c451685` |
| Test suites | 7 | `24abeba`, `faf4c6c`, `5a6d9c6`, `81133cc`, `3c33600`, `675bfa4`, `c32d06f` |
| Docs only | 7 | `676f6d2`, `88e4b2c`, `b665085`, `950cd57`, `61dbd7a`, `bc5896a`, `afd8640` |
| Workspace / build / CI scaffolding | 5 | `2ee7998`, `7533676`, `551954b`, `11b68e6`, `2d5443d` |

Counting by files touched (categories overlap): 7 commits touch
`contract/src/`, 6 touch `frontend/src/`, 7 touch test files, 1 touches
`.github/`.

> **Correction to the previous README.** The README stated *"27 commits"*.
> `git rev-list --count HEAD` returns **28**. The README has been corrected to
> 28 and now cites the command so the number is independently checkable.

### Timeline: the decisive fact

| Event | Timestamp |
| --- | --- |
| `c32d06f` — *feat: improve navigation and eligibility notifications* (adds Dashboard, DashboardTabs, Notification, ProgressSteps, PrivacyDashboard, VerificationHistory, EligibilityCertificate) | **2026-09-15 04:15:40 UTC** |
| `c451685` — *fix: include generated contract artifacts for deployment* | **2026-09-15 05:44:17 UTC** |
| **First feedback response received** | **2026-09-15 12:04:20** (form time) |
| `afd8640` — *docs: update README for Level 5 submission* (`README.md` only) | 2026-09-26 11:52:26 UTC |
| Last feedback response received | 2026-09-29 18:47:21 (form time) |

The form records no timezone, so the form times cannot be pinned to an absolute
instant — but `c32d06f` and `c451685` precede the first response under either
reading (the first response is ~7h49m later if the form is on UTC, or ~2h19m
later if on IST).

**Conclusion: the entire Level 5 product-surface rebuild landed before the first
piece of feedback was received. There is exactly one post-feedback commit in
this repository (`afd8640`), and it modifies `README.md` only. There is no
post-feedback commit that touches application, contract, or test code.**

Therefore **no feature in this repository can honestly be described as
implemented in response to this feedback.** The features below overlap the
feedback themes closely, and the timeline is stated so the reviewer can judge
for themselves, but the causal link is not established by the history.

### Features that overlap the feedback themes — all pre-existing

#### Pre-existing: on-screen progress indicator and phase guidance

- **Feedback it resembles:** *"Add a simple progress indicator and brief
  guidance during verification"* and *"adding a little more guidance and
  feedback during verification would make the experience even better."*
- **What the code does:** renders a four-step progress indicator (Financial
  Information → Verification → Generate Proof → Result), and while a
  verification runs cycles a phase list — *"Connecting wallet…"*, *"Preparing
  verification…"*, *"Generating privacy proof…"*, *"Waiting for blockchain
  confirmation…"* — with per-phase done/active states every 450 ms.
- **Files:**
  `frontend/src/components/ProgressSteps.tsx` (steps defined at lines 3–8),
  `frontend/src/components/VerificationStatus.tsx` (`PHASES` at lines 16–21,
  list rendered at lines 63–70), mounted from
  `frontend/src/App.tsx:259` and `frontend/src/App.tsx:294-302`.
- **Commit:** `c32d06f` — `ProgressSteps.tsx` appears as a 36-line change in
  `git show --stat c32d06f`.
- **Evidence / honest status:** the feature matches the request, but
  `c32d06f` is dated **before the first feedback response**. **Feedback was
  recorded as a requested improvement; repository evidence does not establish
  that this change was implemented specifically as a response to this feedback.**

#### Pre-existing: explicit Eligible / Not Eligible result notification

- **Feedback it resembles:** 52/56 found the result clear; 4 found it only
  *"Mostly clear"*, and one asked for clearer privacy/data-security detail.
- **What the code does:** every completed verification raises a live-region
  notification — *"🎉 Congratulations! You are Eligible."* or *"Sorry, You are
  Not Eligible."* — with `role="status"` / `aria-live="polite"` on success and
  `role="alert"` / `aria-live="assertive"` on failure, auto-dismissing after
  9000 ms.
- **Files:** `frontend/src/lib/navigation.ts` (`resultNotification`, lines
  48–62), `frontend/src/components/Notification.tsx` (ARIA at lines 30–34,
  default duration at line 18), wired at `frontend/src/App.tsx:154` and
  `frontend/src/App.tsx:208`.
- **Commit:** `c32d06f` (adds `Notification.tsx` as a new 52-line file).
- **Evidence / honest status:** no feedback record links this notification to a
  specific request, and it predates the feedback. **Feedback was recorded as a
  requested improvement; repository evidence does not establish that this change
  was implemented specifically as a response to this feedback.**

#### Pre-existing: Dashboard, Privacy Dashboard, Verification History, Eligibility Certificate

- **Feedback it resembles:** the privacy-clarity request, and the 4 *"Mostly
  clear"* result ratings.
- **What the code does:** a Dashboard with Wallet / Eligibility / Verifications /
  Network stat cards, verification-status, privacy-status and recent-activity
  cards; tabs for Overview, Privacy, History, Lender Portal, Certificate and
  Profile; a side-by-side *"never shared"* vs *"can be verified"* Privacy
  Dashboard; a Verification History list with expandable technical details; and
  a printable Eligibility Certificate.
- **Files:** `frontend/src/components/Dashboard.tsx` (stat cards, lines
  23–52), `PrivacyDashboard.tsx` (split view, lines 20–60),
  `VerificationHistory.tsx` (rows, lines 37–77), `EligibilityCertificate.tsx`
  (facts, lines 44–72; `window.print()` at line 111), `DashboardTabs.tsx`,
  all mounted from `frontend/src/App.tsx:327-353`.
- **Commit:** `c32d06f` — `git show --stat c32d06f` lists all four as **new
  files** (+200, +63, +85, +118 lines).
- **Evidence / honest status:** `PrivacyDashboard.tsx` does surface a private vs
  verifiable split, adjacent to the privacy-clarity request — but all four
  components were added in `c32d06f`, **before** the first feedback response.
  **Feedback was recorded as a requested improvement; repository evidence does
  not establish that this change was implemented specifically as a response to
  this feedback.**

### Requests with no corresponding change at all

- **Clearer privacy policy / data-security detail on the application page**
  (response #10). The app has a `Privacy` page and a `Privacy Dashboard` tab,
  but nothing was changed after the feedback arrived: the only commit inside the
  feedback window after the first response is `afd8640`, which touches
  `README.md` only. **Recorded as a requested improvement; repository evidence
  does not show it being implemented.**
- **Clearer guidance for first-time users** (response #13). Same position — no
  post-feedback commit touches onboarding or help copy.
- **"Improve Frontend"** (earlier export only, and unspecified as to what to
  change). No corresponding change could be identified.

### Net position

| Claim | Verdict |
| --- | --- |
| Feedback-driven code changes that can be verified | **None** |
| Post-feedback commits in the repository | 1 (`afd8640`) |
| Post-feedback commits touching source or tests | **0** |
| Features that exist and overlap the feedback themes | The Level 5 build in `c32d06f`, committed **before** the first response |

What *was* produced in response to the reviewer's "Revisions Needed" verdict is
**documentation only**: this file, [`USERS.md`](../USERS.md),
[`docs/USAGE.md`](./USAGE.md), and the `README.md` corrections (commit count,
participant count, repository layout, and a rewritten Feedback section). That
work is a working-tree change in front of the reviewer — it is **not yet
committed**, so it is deliberately not counted in the 28 commits above, and no
commit hash is claimed for it.

---

## Wallet verification evidence boundary

The CrediFi team performed a **manual Subscan check** of the **56 unique wallet
addresses** in the current export against **Midnight Preprod Subscan**. The
result was recorded as a tally: **53 found, 3 not found**. It is recorded in
[`USERS.md`](../USERS.md) and is deliberately **not** expanded here.

Boundaries, applied consistently:

- The result is a **manual aggregate tally**. The per-address output does not
  exist in this repository, so **no individual wallet is marked found or not
  found** anywhere in the documentation.
- **The 3 unmatched addresses are intentionally left unidentified.** They have
  not been inferred from address formatting, from row order, or from the older
  exports — doing so would attach a real "not found" label to a specific person
  on a guess.
- Being found on Subscan means the address is **indexed/recognised** by the
  explorer. It does **not** prove the person used the CrediFi application.
- **No transaction or activity evidence is claimed.** None is stored in this
  repository.
- The tally applies **only** to the current export's 56 unique addresses.

---

## Evidence and limitations

**What is solidly evidenced**

- 56 responses, 56 unique wallet addresses, 56 unique submitter emails,
  reproducible from the current export `(Responses) (2).xlsx`.
- All rating and closed-form counts above, reproducible from the same export.
- 28 commits, reproducible with `git rev-list --count HEAD`.
- The commit timeline relative to the feedback window, reproducible with
  `git log --pretty=format:'%h %ad %s' --date=iso`.
- All code behaviours referenced, reproducible by reading the cited files.

**What cannot be proven from this repository**

1. **That any change was caused by the feedback.** The build predates the first
   response; the only post-feedback commit is documentation.
2. **Which specific 3 addresses were not found on Subscan.** The check was a
   manual one recorded only as a tally, so the 3 are left unidentified on
   purpose. They were not inferred from address format or row order.
3. **That any wallet address ran the CrediFi application.** The app records no
   server-side sessions and the verification runs client-side (see
   [`docs/USAGE.md`](./USAGE.md#known-limitations)).
4. **Any transaction activity.** None is recorded or claimed.
5. **That any specific address is a Preprod address.** 4 of the 56 do not match
   the `mn_addr_preprod1…` string shape, but that is a format observation only
   and is never treated as a verification signal.
6. **On-chain user counts.** The contract is deployed, but the browser flow
   executes the compiled contract in-process and submits no transaction, so
   on-chain activity cannot evidence user counts.
7. **That the 3 unmatched addresses correspond to any particular response row.**
   Stating that would require the per-address Subscan output, which does not
   exist here.

---

## Feedback source

CrediFi — Level 5 user feedback (Google Sheet):
<https://docs.google.com/spreadsheets/d/1yYpRJhoTLcjaDhWp4KIBGeo7d0WnhsDOUtQmGLtmjI8/edit?usp=sharing>

- Per-response wallets, timestamps and format audit: [`USERS.md`](../USERS.md)
- How to run and test the app: [`docs/USAGE.md`](./USAGE.md)
