# Release evidence and control checks

Checked 6 November 2026. The desk checks records against configured local policy. It does not certify NIST conformance or legal compliance. Applicability, retention and deployment authority belong to the organisation's responsible people.

## Cited guidance

[NIST SP 800-53 Revision 5, CM-3 and CM-3(2)](https://doi.org/10.6028/NIST.SP.800-53r5) addresses configuration change review, decisions, retained records and testing before implementation. [The official publication](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) is the source. This is a control framework, not a blanket NZ or AU legal obligation. These controls motivate the following local checks, which are our implementation choices rather than quoted NIST requirements.

| Local check | What it actually checks | Scope |
|---|---|---|
| LOCAL_TEST | Latest current-version rehearsal passed | Supplied PGlite fixture, not production |
| LOCAL_REVIEW | Latest rehearsal has approval from someone other than owner and author | Names are asserted, not authenticated |
| LOCAL_RECOVERY | A recorded failed deployment has a later recovery outcome | Evidence reference is recorded, its truth needs human verification |

Revising a specification creates a new version and makes the old rehearsal and approval insufficient for release. Rehearsing again requires a fresh approval. A failed rehearsal cannot be approved. Release packs require a current passing rehearsal and independent approval. Failed deployments remain visible until a rollback outcome is recorded. There is no automatic production executor and no deletion command.

## What the checks cannot establish

Assertions can be weak or wrong. A rollback assertion does not prove all production data is restored. PGlite does not reproduce every Postgres extension, lock or performance characteristic. A real deployment needs representative staging tests, backups, recovery rehearsals and the organisation's access controls. Operator names and evidence references are not signatures. Database owners can change rows, so this is not tamper-proof storage. Imported execution history is a reported source record, not a verified deployment.

## Record handling

Specifications can contain private test data. Use synthetic fixtures in shared repositories. Keep imports, drafts, generated documents and evidence private, with backup and access controls for the underlying filesystem and database. Adopt a retention policy covering approved changes, rejected changes, test logs and deployment evidence. The base never deletes records or automatically certifies a review.
