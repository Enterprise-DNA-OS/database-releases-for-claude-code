# Database Releases for Claude Code

Own the evidence behind a database release: what changed, what was tested, who reviewed it and what happened afterwards.

Built for teams reviewing PostgreSQL changes. This is a release governance desk with a disposable rehearsal runner. It does not implement Liquibase's multi-engine migration platform, enterprise authentication or production execution.

## Three ways to own it

- **Do it yourself.** Free under MIT. Install, import your Liquibase history and review changes with Claude Code, Codex, OpenCode or Cursor.
- **We customise it.** Enterprise DNA maps your history, adds your rules and builds the connections or interface your team needs. One setup fee, then a retainer.
- **We run it for you.** Omni by Enterprise DNA installs and operates the agreed release workflow beside your other business systems. One setup fee, then a retainer. [Get your version built](https://enterprisedna.co/omni/book?offer=replace-software&utm_campaign=liquibase&utm_medium=github).

## Start with the demo

Node 20 or later. No account, external service or database server needed.

```bash
npm install
npm test
npm run demo
npm run desk -- rehearse DEMO-001 --by="Demo operator"
npm run desk -- rehearse DEMO-003 --by="Demo operator"
npm run view
npm run docs
```

The last rehearsal deliberately fails and exits 1. The supplied assertion is false. Every other setup command should pass. Demo data is synthetic, with overdue changes and no invented approvals. Seed is idempotent. Never seed a production database.

PGlite stores the desk in `.data/db`. Set DATABASE_URL to use operator-managed Postgres instead. The rehearsal worker always uses a separate, disposable in-memory PGlite instance, even when the desk uses Postgres. It never connects to a deployment target. `.env.example` documents the desk connection. `npm test` uses temporary data and ignores production DATABASE_URL. TEST_DATABASE_URL is accepted only for an empty disposable test database.

## The weekly release rhythm

| Job | Command |
|---|---|
| Review the change window | `npm run desk -- release-queue` |
| Chase sign-off | `npm run desk -- approval-inbox` |
| Follow failed releases | `npm run desk -- rollback-watch` |
| Find overdue work | `npm run desk -- attention` |
| Check evidence gaps | `npm run desk -- compliance` |
| Prepare the Monday review | `npm run desk -- weekly-review` |
| Draft a review note | `npm run desk -- draft-review` |

Every command supports `--json`. Flags use `--name=value`. IDs can be shortened and names matched without case. Ambiguous matches list candidates and exit 1. Run `npm run desk -- help` for all syntax. One command library in `.claude/commands` serves every supported agent.

## A release from proposal to evidence

1. Add the environment with `add-environment` and an owner. Environment names identify records, not connection strings.
2. Copy `examples/change.json` privately and replace the baseline, forward script, assertions, rollback, impact and recovery notes. Each assertion must return exactly one boolean column named `ok` with value `true`.
3. Use `add` with a code, title, environment, owner, due date, risk, specification file, reason and operator.
4. Run `rehearse`. It executes baseline, forward, assertion, rollback and rollback assertion in a fresh database. A failed assertion or script records a failure. The worker has a 20-second timeout.
5. Have a different person review the original scripts and evidence. `review` requires a reviewer different from the change owner and version author. Approval is attached to the latest rehearsal of that version.
6. Use `release-pack <change> <new-directory>` to produce the reviewed scripts and a checksum manifest. Nothing executes against production. The baseline is a test fixture, never an instruction to recreate a live database.
7. An authorised operator tests against a representative staging copy, checks backups and executes the approved change using their existing controlled deployment process. Record the real outcome with `record-deployment` and its evidence reference.
8. A failed deployment can receive a later `rolled-back` record. Earlier evidence stays intact. New work uses `revise`, which requires fresh rehearsal and approval.

A passing fixture test does not prove production compatibility, recovery completeness or performance. Verification assertions are only as strong as the supplied checks. Database-specific extensions, lock behaviour and production data need staging tests. The desk records asserted operator names and references, not authenticated identities or independently verified evidence. A database administrator can alter records. Do not use it as a tenant permission system.

## Bring your Liquibase history

Export the documented DATABASECHANGELOG columns as CSV using your approved database export tool. One command imports the history:

```bash
npm run desk -- import liquibase imports/history.csv --environment="Demo reporting" --dry-run --by="Migration operator"
npm run desk -- import liquibase imports/history.csv --environment="Demo reporting" --by="Migration operator"
```

`ID`, `AUTHOR` and `FILENAME` form the changeset identity within an environment. Matching rows are idempotent. Conflicting historical facts stop the entire import. `MARK_RAN` remains marked-ran and never becomes successful deployment proof. Extra columns are preserved in the source row. [The replacement guide](docs/replace-liquibase.md) explains the export, reconciliation and scope. XML/YAML changelog execution, rollback code, attachments, access controls and vendor policy packs are not imported. This moves history in a day when exports are ready. Replacing deployment automation is a separately tested project.

## Ten questions to ask across your records

These run today with `npm run desk -- insights <number>`. We have not tested whether a configured Liquibase account can answer the same questions.

1. Which owners have overdue uncompleted changes?
2. Which high-risk changes have no passing rehearsal?
3. Which releases await independent approval?
4. Which revisions have older approvals but no current approval?
5. Which environments contain imported marked-ran history?
6. Which imported changes have no recorded checksum?
7. Which failed deployments still need a recovery record?
8. Which environments have changes but no imported vendor history?
9. Which reviewers approved the most versions?
10. Which changes have accumulated failed rehearsals?

## Your first hour: ten things to ask for

1. Add our first environment and its owner.
2. Test our history export without saving it.
3. Reconcile changeset identities and execution types against the original.
4. Show our overdue release reviews.
5. Add a change with a small representative fixture.
6. Run its forward and rollback assertions.
7. Prepare the change review document for a different reviewer.
8. Draft this week's review from the queue, approvals and recovery record.
9. Add a business-unit field using `/customise` and a new migration.
10. Add an owner workload report with `/new-view`.

## Documents, data and recovery

`brand.json` controls the business name, logo and colours. `npm run docs` renders change reviews and release evidence packs into `docs-out/`. `npm run view` renders read-only week and assurance reports into `views/`. Print these HTML snapshots to PDF. [Why no front end](docs/why-no-front-end.md) explains what a custom interface adds.

Nine domain tables use UUIDs, timestamps and update triggers. RLS has no public access policies, and public privileges are revoked. Trusted database owners still have access. Keep private specifications, history exports, release packs and generated reports out of Git. Use the ignored `imports/`, `exports/` and `release-packs/` folders.

`npm run desk -- export exports/review-01` saves every domain record as JSON. This is a portable evidence snapshot, not a backup restore command. Back up the database and any linked evidence separately and test restoration before switching. There is no delete command. [Compliance](docs/compliance.md) separates NIST guidance from the desk's local controls.

`npm test` checks both successful and failed rehearsals, broken rollback, stale approvals, revision history, deployment transitions, atomic imports, duplicate identities, environment separation, export integrity and HTML escaping. The same suite runs on Windows and Linux, with an additional Postgres job in GitHub Actions.

MIT. Independent of Liquibase and Anthropic. [Liquibase comparison](https://enterprisedna.co/omni/instead-of/liquibase?utm_source=github&utm_medium=readme&utm_campaign=liquibase).
