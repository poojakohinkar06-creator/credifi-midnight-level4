# CrediFi Level 5 — Preprod Test Users & Wallet Evidence

Repository evidence for the CrediFi **Level 5 – Full Moon** test round on
**Midnight Preprod**. Every row is taken verbatim from the *CrediFi — Level 5
Preprod User Feedback Form* response export. Nothing here is invented,
normalised, or "cleaned up".

| Evidence class | Where it lives |
| --- | --- |
| **Wallet evidence (this file)** | 56 responses, 56 wallet addresses, 56 form timestamps — reproduced in-repo so a reviewer never has to leave the repository to count them |
| **External feedback source** | [CrediFi — Level 5 user feedback (Google Sheet)](https://docs.google.com/spreadsheets/d/1yYpRJhoTLcjaDhWp4KIBGeo7d0WnhsDOUtQmGLtmjI8/edit?usp=sharing) |
| **External wallet check** | Midnight Preprod Subscan — reported as an aggregate result, see [Wallet verification](#wallet-verification-subscan) below |
| **Feedback analysis** | [`docs/FEEDBACK.md`](./docs/FEEDBACK.md) |
| **Usage guide** | [`docs/USAGE.md`](./docs/USAGE.md) |
| **Commit evidence** | `git rev-list --count HEAD` — see [`docs/FEEDBACK.md`](./docs/FEEDBACK.md#commit-evidence) |

---

## Summary

| Measure | Value |
| --- | --- |
| **Source of truth** | `_CrediFi — Level 5 Preprod User Feedback Form  (Responses) (2).xlsx` |
| Total feedback responses | **56** |
| Blank / artefact rows | **0** |
| Non-blank responses | **56** |
| Non-empty wallet addresses | **56** |
| Non-empty submitter emails | **56** |
| **Unique wallet addresses** | **56** (no exact duplicates) |
| **Unique submitter emails** | **56** (no duplicates) |
| Addresses matching the `mn_addr_preprod1…` string shape | 52 |
| Addresses not matching that string shape | 4 |
| **Manual Subscan check — found (aggregate)** | **53 of 56** |
| **Manual Subscan check — not found (aggregate)** | **3 of 56** |
| Testing window | 2026-09-15 12:04:20 → 2026-09-29 18:47:21 (form timestamps) |

The **Level 5 requirement is 50 Preprod user wallet addresses.** This round
exceeds it by response count: **56 responses, 56 unique wallet addresses**, of
which **53 were found** in the team's manual Subscan check.

That count alone is **not** a claim of complete on-chain verification. Four
things are deliberately not being claimed, and each is spelled out below:

1. **No individual address is marked found or not found.** The Subscan result
   was recorded as a tally (53/3) from a manual check. The per-address output
   does not exist in this repository, so the **3 unmatched addresses are left
   intentionally unidentified** and no row carries a per-address verdict.
2. **Being found on Subscan only means the address is indexed by the explorer.**
   It does **not** prove the person behind it ran the CrediFi application, and
   **no transaction or activity evidence** is reproduced anywhere in this
   repository.
3. **The address-shape split (52 / 4) is a string-format observation only** and
   is never used to infer verification, Preprod membership, or which 3 addresses
   were missing. See [Address format audit](#address-format-audit).
4. **All 56 responses are retained**, including the 4 malformed entries and the
   1-character near-duplicate pair. Nothing was deleted or merged.

---

## Wallet verification (Subscan)

**Basis of this result: a manual Subscan check performed by the CrediFi team.**
The 56 unique wallet addresses listed in this file were checked one by one
against **Midnight Preprod Subscan**. The outcome was recorded as a count only:

| Manual Subscan check result | Count |
| --- | --- |
| Address / account found on Subscan | **53** |
| Address / account **not** found on Subscan | **3** |
| **Total unique addresses checked** | **56** |

### What this does and does not establish

**It establishes:** that when each of these 56 addresses was looked up on
Midnight Preprod Subscan, a result was returned for 53 of them and no result was
returned for 3 of them. In other words, 53 of the 56 addresses are indexed and
recognised by the Preprod explorer.

**It does not establish:**

- that any given address actually ran the CrediFi application;
- that any address transacted on Preprod — **no transaction or activity data is
  stored in this repository, and none is claimed**;
- **which specific 3 addresses** were not found.

### Why no per-row Subscan result is shown

The per-address Subscan output was not recorded in this repository — only the
tally was. Filling the **Subscan Status** column row by row would therefore
mean *inventing* evidence.

The 3 unmatched addresses are **intentionally left unidentified**. They have
deliberately **not** been inferred from address formatting, row order, or the
older response exports, because doing so would attach a real "not found" label
to a specific person on a guess. So the column reads identically for all 56 rows:

> Manual Subscan check, aggregate only — 53 of 56 found / 3 not found; **this
> individual address is not recorded as found or not found**

To upgrade this to per-address evidence, the Subscan export (address + result,
no secrets) would need to be committed, and this table could then be completed
precisely. Until then the aggregate tally stands on its own, and the 3
unidentified addresses are neither marked verified nor removed.

> **No format-based verification claim is made anywhere in this file.** The
> address-shape audit further below is a *string-format observation only*. It is
> never used to imply that an address is or is not a Preprod account, and it has
> no relationship to the 53/3 tally.

**Terminology, used strictly throughout:** an *email address is not an on-chain
identity*; a *wallet address is the blockchain identifier*; *being found on
Subscan is evidence that the address is indexed*. No private key, seed phrase,
password, or other secret appears anywhere in this file or this repository.

---

## Address format audit

This is a **string-format inspection of the address text** only. It is reported
as a data-quality observation and is **not** a verification of anything.
CrediFi itself enforces the Preprod network at connection time (`NETWORK_ID =
"preprod"` in `frontend/src/config.ts`, compared against the network the wallet
reports in `frontend/src/wallet.ts:172`), so an address *read by the running
app* must have come from a Preprod wallet — but this file has no access to those
connection logs or to an indexer, so that inference is **not** asserted per
address, and it is **not** used to guess which 3 were missing from Subscan.

| Format shape | Count | Rows |
| --- | --- | --- |
| `mn_addr_preprod1…`, 74 characters | 52 | all others |
| `mn_addr1…`, 66 characters — **no Preprod prefix** | 2 | #2, #29 |
| `mn_addr_preprod1…`, 38 characters — **truncated** | 1 | #12 |
| `mn_addr_preprod1` + 32 characters of free text — **malformed** | 1 | #33 |

**52 of 56 addresses match the Preprod `mn_addr_preprod1…` shape, and 4 do not.**
The Google Form asked the question as *"Preprod Wallet Address"*, but a question
label is not a verification, so no row in this file is described as "verified
Preprod" — and this 52/4 split is **never** cross-referenced against the 53/3
Subscan tally.

### Notes on the 4 non-conforming rows

- **#2 and #29** carry `mn_addr1…` instead of `mn_addr_preprod1…`. They are
  well-formed 66-character addresses in the non-Preprod form. Recorded as
  submitted.
- **#12** is 38 characters — far below the 74 seen elsewhere — and is almost
  certainly a truncated paste.
- **#33** is the address followed by `- wallet address tula lagla tar`
  (*"the wallet address I don't have"*). The submitter effectively stated they
  did not have the address to hand. This is kept in the table rather than
  deleted: **removing it would understate the round by one response and hide a
  real data-quality issue.**

### Near-duplicate pair

Responses **#38** and **#43** differ by exactly **one character** (position 43:
`u` vs `v`) and may well be the same wallet submitted twice with a typo. They
are **not** byte-identical, so they are kept as two separate rows rather than
silently merged. This is why the unique-address count is 56 and not 55.

---

## Test users

| # | Email | Wallet Address | Feedback/Test Date | Subscan Status | Evidence/Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `pranitasakat2008@gmail.com` | `mn_addr_preprod1s225nkv9ja6g2axuv553aqufey85582t9xn0f5c2ws0fnqakj7rs8l79jm` | 2026-09-15 12:04 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 2 | `nayanpalande06@gmail.com` | `mn_addr1seyst82p5kqzt7k2pe2lv09d9e75lwsmltvf7eea8xwypn0j5ynqgkqgst` | 2026-09-15 16:17 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | **No Preprod prefix** — `mn_addr1…` (66 chars), not the `mn_addr_preprod1…` form; Q2: 1AM Wallet owned — yes |
| 3 | `poojakohinkar06@gmail.com` | `mn_addr_preprod183323eryp4yajzrqmc7uagn3vtp2fj94wpxc7y4g2qefz8jqux0squd4yj` | 2026-09-15 16:47 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 4 | `vaishnaviraut034@gmail.com` | `mn_addr_preprod16j4dp2cn6fapvs20yeantn02a3xt69vz6cv2cn0zhggx2l2dqe3sn058fr` | 2026-09-15 16:56 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 5 | `npalande2106@gmail.com` | `mn_addr_preprod12rlttu4j5eljj6ucyktvne8yt6d0kegx578mwva25x6nm4hqwrts7tp08d` | 2026-09-15 17:22 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 6 | `kalbhorpratiksha333@gmail.com` | `mn_addr_preprod1yccfqe5up5g847f3rg5qktev5hz8dvzghe58fn95qpgyekzh96dsk7psx0` | 2026-09-15 18:57 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 7 | `mansisandbhor@gmail.com` | `mn_addr_preprod1ar57ffsuaul3dhune97xkmmgexda6mtujsng0rhvcc5frt84frdsrm3j27` | 2026-09-15 20:54 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 8 | `Sanskrutichvan1107@gmail.com` | `mn_addr_preprod1g0v8ay42g30hd7fqyppccglk67wzyq0hfazak207tuf7cevkta8qggh7yc` | 2026-09-16 08:27 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 9 | `pallavigawali2003@gmail.com` | `mn_addr_preprod105d07kqymeckxdrl4pkw7h9uhecp4l5hwr93urjhrr8c5643nkls5w48ht` | 2026-09-16 22:16 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 10 | `pragatiadhav011@gmail.com` | `mn_addr_preprod16lyqd3akfs55p3nszntzh0vdc53059eflh4z8n0k3wk6rxq0p82qff0l6r` | 2026-09-16 22:18 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 11 | `akankshashinde069@gmail.com` | `mn_addr_preprod1xm0rugylaqcdx533xxwyutf73xqdc5qrhf6znftv2zr2xs6da0xs53fdzw` | 2026-09-17 12:24 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 12 | `nandinijadhavv06@gmail.com` | `mn_addr_preprod15lk7gyr36efl2kp3x8872u` | 2026-09-17 19:34 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | **Malformed / truncated** — Preprod prefix present but only 38 chars; Q2: 1AM Wallet owned — yes |
| 13 | `vaishnavigawali0@gmail.com` | `mn_addr_preprod1hkydc6dhrngdttcyv52t2l02evehnyv57864qq8d90cweggtfuysy7d5xy` | 2026-09-18 11:24 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 14 | `atredhanshree7@gmail.com` | `mn_addr_preprod1n0dh5cxlem8cn08rcpyc5awnkjjsw6080fjexs7x6xv3gztn367s7r7man` | 2026-09-19 21:03 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 15 | `priyankag25101998@gmail.com` | `mn_addr_preprod1n25nrk2j42yuasyhd2m74u6j4mrv48kqkj4kezn6mgx35admmuksf2u9tp` | 2026-09-19 21:59 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 16 | `Kawatevishakha@gmail.com` | `mn_addr_preprod1xmzfgqnvayhnupvqf2k2vfd6g3tyzt4wddhzljnudte9qavyv7vsjff7tg` | 2026-09-19 21:59 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 17 | `shravanikhatekar2004@gmail.com` | `mn_addr_preprod1vvccpsafur68ysus83swluwptcgyy7ttwzvkh08tpgf8gu92r50s45csnp` | 2026-09-19 22:17 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 18 | `poojakohinkar9922@gmail.com` | `mn_addr_preprod14ut7e893hx4fyhqgksj8n62j63azll383pjveyjrswthfkg9r7aqr4x5u7` | 2026-09-20 13:46 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 19 | `aaryawalunj11@gmail.com` | `mn_addr_preprod1ftz4el9xel96c28yuq3ym4fx7hw704lxer4ne55xwvzgrfka4wksjvcecp` | 2026-09-20 13:51 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 20 | `shkohinkar@gmail.com` | `mn_addr_preprod1na2qdhmhj9efrynlcle8ctvgftnq5yha86lz7awu8saqdelmj0tqvwrux4` | 2026-09-20 15:51 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 21 | `sanskrutipawar512@gmail.com` | `mn_addr_preprod1wdddd8nnqxnys4v3vp8w3wku3c3x3v5ekqefq5p69lk30q6m9weq9vj5yg` | 2026-09-20 15:54 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 22 | `shubhamgolekar62021@gmail.com` | `mn_addr_preprod1f9pxhm8u0eje9y2tupjysref437r2jsdgmesvdp8yk5gm48lxuqqkl75pw` | 2026-09-20 15:57 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 23 | `dnyaneshwaribadhe2323@gmail.com` | `mn_addr_preprod1cwrw8flhlqd9p9ua9mrzl4yxy27505wawjmdgu2sgvppm2f6a3jswg8yxj` | 2026-09-21 11:29 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 24 | `babarpayal953@gmail.com` | `mn_addr_preprod1s3uf80npv6gkkpcvrunxcrzmfdvxy95fx03ej568scjsxa2ly2hq9q36em` | 2026-09-21 18:37 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 25 | `nikitabiradar300@gmail.com` | `mn_addr_preprod1zj6vz2zjwmx58gfhyamp7dpnn3jhpfvhlms7rac2fksha8wy4vcq2xwuuq` | 2026-09-22 12:20 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 26 | `shubhangishelake26@gmail.com` | `mn_addr_preprod14fxt9rw8teyy7693ce3wxm6n9vq7rehkcfn2xrua626mzlldzdps86gz70` | 2026-09-23 21:36 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 27 | `mengadeujjwala3@gmail.com` | `mn_addr_preprod1dhvm77xyly0pxdtjd2er4qvkluqf7yldteny57cnf328uprl763qqlvm6h` | 2026-09-23 21:50 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 28 | `mainpro3331@gmail.com` | `mn_addr_preprod1mxr03p7s7fauelh3kjmu9vlm3xxrq7dy76kw2grkq7kf9l34e6psw7c0cv` | 2026-09-24 09:49 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 29 | `aryakale1052@gmail.com` | `mn_addr17q5rtxzd7qfw3frswd2hhkee5mdv4dzy397xc2n5g4juhtcy6lpszn8e87` | 2026-09-24 09:56 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | **No Preprod prefix** — `mn_addr1…` (66 chars), not the `mn_addr_preprod1…` form; Q2: 1AM Wallet owned — yes |
| 30 | `sawantdiksha83@gmail.com` | `mn_addr_preprod1m09d58thcnk73r2swegxu5cu25jp8d554vnjxg2n45uw5xkwk9vsh0jqq4` | 2026-09-24 12:18 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 31 | `vaishnavijawale403@gmail.com` | `mn_addr_preprod186u2agmxt7fyxsfrhauc5d849k796l6drae78yv657rpyyh2lwqsnfj3pe` | 2026-09-24 21:48 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 32 | `shubhankarotijagadale@gmail.com` | `mn_addr_preprod10j7c46ryvhmed2e4n3428lpfrnyhkndfzakqmt2znjh8wwznk6aqlmfv2k` | 2026-09-24 21:51 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 33 | `poorvam2006@gmail.com` | `mn_addr_preprod10ulpkx7pqad96mp5wlhgw0g4hsqsfr9hmua7vku89hqxxfectr2ssr0h6v - wallet address tula lagla tar` | 2026-09-25 13:31 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | **Malformed** — submitter appended free text (`- wallet address tula lagla tar` = *"the wallet address I don't have"*) instead of a clean address; Q2: 1AM Wallet owned — yes |
| 34 | `shamalgorde1999@gmail.com` | `mn_addr_preprod167sn20y6as3rmgvu552657l0nw356av7s7fu93xa55z39jjcca7s4xsr4n` | 2026-09-25 17:55 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 35 | `jayeshkadam0710@gmail.com` | `mn_addr_preprod19l9qag2ht4zsn9qq9z6327chdkswg9aus7v6r5zck80wf8jdx3cq6sajdz` | 2026-09-25 18:37 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 36 | `prasadkohinkar@gmail.com` | `mn_addr_preprod1vr3w8j3fakhcr9vry2h8x4xl44zq7xsefra80j2ef7yywa75r4gq4755v3` | 2026-09-25 18:41 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 37 | `dipakkohinkar81@gmail.com` | `mn_addr_preprod10jlkrqunfc59k750zkykyd6qwtxmhucufkczrwghz4eq0psv4jhqqtm5k0` | 2026-09-25 18:45 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 38 | `Surekhakohinkar2595@gmail.com` | `mn_addr_preprod1qpdj5uj0ry3xvqd82cf5gdsw6qu9vh2cpdqlnn7atc792kt5nxhqmz34kw` | 2026-09-25 18:47 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; **Near-duplicate pair** with response #43 — differs at position 43 (`u` vs `v`); Q2: 1AM Wallet owned — yes |
| 39 | `ChandrabhagaKohinkar@gmail.com` | `mn_addr_preprod1ffn5knr2gfk9gzqqcexs22kgs75rt6je27p9s65hz4fxqa9x3etqqp65hu` | 2026-09-25 18:53 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 40 | `anushkalonkar9403@gmail.com` | `mn_addr_preprod1fszvd6yhut0pja5r496nekn54t7hjl7tqtyw5cm5zumf9x88gl7qnl0y9y` | 2026-09-25 19:06 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 41 | `bvaibhavi111@gmail.com` | `mn_addr_preprod1h9fql8qsacxpp37ezn4jry8wlff8ddsualfemfdlnv4y2t6wt4tskasn6j` | 2026-09-25 19:06 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 42 | `usakore@gmail.com` | `mn_addr_preprod1900v4lhuwufjx9339ekld4qydrjk5kzagwgmxn7u07zf9tvah6hs7kn9ug` | 2026-09-25 19:08 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 43 | `sandipkohinkar@gmail.com` | `mn_addr_preprod1qpdj5uj0ry3xvqd82cf5gdsw6qv9vh2cpdqlnn7atc792kt5nxhqmz34kw` | 2026-09-25 19:28 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; **Near-duplicate pair** with response #38 — differs at position 43 (`v` vs `u`); Q2: 1AM Wallet owned — yes |
| 44 | `vishalbhogade@gmail.com` | `mn_addr_preprod1q836yvvvcqnlpqt4rsnqky5vm2jemtszshjzhtmw5urqapax7l2qy3ywd2` | 2026-09-25 21:32 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 45 | `durgaingale5@gmail.com` | `mn_addr_preprod1qtquk48xcat5tk5407kxtdkdgluqrh8hy9z4efwqzzcd67cq590sgl3mx8` | 2026-09-25 21:48 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 46 | `suchetaparit@gmail.com` | `mn_addr_preprod1n6z3y5xfx83vma5t8xtywuwxvx85065znxz4xt77hl030wtvrx8qm8dhgq` | 2026-09-25 21:55 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 47 | `adityanandkhile9696@gmail.com` | `mn_addr_preprod1le2s8vnsfrl97cns2amwfzxmr77acv3wc8syrtd59zal6z4pumeqe5fphh` | 2026-09-25 22:05 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 48 | `SHETEPRIYA2003@GMAIL.COM` | `mn_addr_preprod1sxzrtp66mkntuasst9cu44dwpy86xq6x5qz55zw38twz50wuaklq9x9t04` | 2026-09-26 11:38 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 49 | `saikohinkar693@gmail.com` | `mn_addr_preprod18t6ncw5y56kegv6yqrrqmnpsfsl8tsmt3g4ny6szrt0qnpdtjxzqezwrpf` | 2026-09-26 14:12 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 50 | `kshirsagarsarthak09@gmail.com` | `mn_addr_preprod13p48pfkufurw4eymxqqaphexlkefhr5hx0c49jq8mu4c6rmtxejqsfms76` | 2026-09-26 14:18 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 51 | `mohitsurya.jcoe@gmail.com` | `mn_addr_preprod1rzcxqwmfllnm2pf5w2tsupa67hqc7z2lr60u2yenxc83gw9wmjaq2qaynm` | 2026-09-26 14:20 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 52 | `balgharesnehal27@gmail.com` | `mn_addr_preprod1dr2k3y5l8utpj8vpk99j5tkkapc8pumf6j865lpulss9l0tgnv7q230nud` | 2026-09-28 08:14 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 53 | `manas171414@gmail.com` | `mn_addr_preprod16pk2gw4m7052l84jlt68afr9vc7mzsz80tu3xntpnepqud77g2nqvghq8x` | 2026-09-29 18:41 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 54 | `motegovind75@gmail.com` | `mn_addr_preprod1sa3u67p4u5k0yfdlxnvmetetfzskcmm0neur3ptnwc6j59dyha7stkk9gd` | 2026-09-29 18:42 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 55 | `prajaktagatkal062@gmail.com` | `mn_addr_preprod1seyst82p5kqzt7k2pe2lv09d9e75lwsmltvf7eea8xwypn0j5ynqgkqgst` | 2026-09-29 18:44 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |
| 56 | `sarthakweb3@gmail.com` | `mn_addr_preprod1l6ya47a6mw77ete59q6ldzjw8262zh640seme4xeuwmq0ypm8hgqdks2jg` | 2026-09-29 18:47 | Manual Subscan check (aggregate) — 53 of 56 found / 3 not found; **this individual address is not recorded as found or not found** | Preprod-prefixed, 74-char format; Q2: 1AM Wallet owned — yes |

---

## Data provenance and limitations

- **Sole source of truth:**
  `_CrediFi — Level 5 Preprod User Feedback Form  (Responses) (2).xlsx` —
  56 data rows, 0 blank rows, 56 unique addresses, 56 unique emails. Every row
  in this file comes from this export and no other.

- **Three older exports exist and were reconciled against it, then set aside.**
  They are recorded here for transparency, and none of their numbers are used
  anywhere in this file:

  | Export | Non-blank | Unique emails | Unique addresses | Exact duplicate addresses |
  | --- | --- | --- | --- | --- |
  | `(Responses).xlsx` (oldest) | 51 | 50 | 51 | 0 |
  | `(Responses) (1).xlsx` | 56 | 55 | 55 | 1 |
  | **`(Responses) (2).xlsx` — used here** | **56** | **56** | **56** | **0** |
  | `Form Responses 1.csv` | 51 | 50 | 50 | 1 |

  Two concrete corrections the current export made, which is why it is
  authoritative rather than merely newest:

  - `(1).xlsx` contained **one duplicated address**
    (`mn_addr_preprod1833…`), submitted under two different emails
    (`poojakohinkar06@…` at 16:47:25 and `sarthakweb3@…` at 18:47:21). The
    current export gives `sarthakweb3@…` a distinct address, removing the
    duplicate.
  - In the same snapshot, one row's email read `pranitasakat2008@gmail.com`;
    the current export corrects it to `vaishnavijawale403@gmail.com` at the
    same timestamp with the same wallet address.
  - Only the **oldest** export contains the answer *"Improve Frontend"*.
    That same row (identical timestamp) answers *"No"* in the current export.

  The 53/3 Subscan tally applies **only** to the 56 unique addresses in the
  current export. It was **not** run against any earlier export, and no earlier
  export is used to help identify the 3 unmatched addresses.

- **Timestamps** are the form submission times, used as the test date. The form
  records no timezone offset, so times are reproduced as written and are not
  converted to UTC.
- **Addresses and emails are reproduced exactly as submitted**, including the
  malformed entries. Normalising them would break traceability back to the
  source sheet.
- **Emails are included here only to preserve the form's wallet ↔ submitter
  mapping** that the reviewer needs in order to audit the evidence chain. They
  are unnecessary personal information for the wallet-evidence requirement. If
  this repository is ever published, consider dropping the Email column — the
  wallet-address evidence stands on its own without it.
- **The CrediFi application never displays a wallet address in a verification
  result.** It shows a derived holder hash (`holderAddressHash` in
  `frontend/src/engine.ts`). The addresses in this file come only from the
  feedback form, not from the application.
