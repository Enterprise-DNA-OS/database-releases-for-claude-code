# Database Releases for Claude Code

Business: [your business]. Operator: [your name]. Keep the evidence behind each database release together.

Read the command matching the job in `.claude/commands`. Every answer starts with the actual CLI. Flags use `--name=value` and every command supports `--json`. `npm run desk -- help` documents syntax.

## One route per job

| Job | Recipe |
|---|---|
| environments | `.claude/commands/environments.md` |
| changes | `.claude/commands/changes.md` |
| show | `.claude/commands/show.md` |
| release-queue | `.claude/commands/release-queue.md` |
| approval-inbox | `.claude/commands/approval-inbox.md` |
| rollback-watch | `.claude/commands/rollback-watch.md` |
| attention | `.claude/commands/attention.md` |
| compliance | `.claude/commands/compliance.md` |
| legacy-history | `.claude/commands/legacy-history.md` |
| history | `.claude/commands/history.md` |
| insights | `.claude/commands/insights.md` |
| add-environment | `.claude/commands/add-environment.md` |
| add | `.claude/commands/add.md` |
| revise | `.claude/commands/revise.md` |
| rehearse | `.claude/commands/rehearse.md` |
| review | `.claude/commands/review.md` |
| release-pack | `.claude/commands/release-pack.md` |
| record-deployment | `.claude/commands/record-deployment.md` |
| log | `.claude/commands/log.md` |
| import | `.claude/commands/import.md` |
| compare-history | `.claude/commands/compare-history.md` |
| export | `.claude/commands/export.md` |
| weekly-review | `.claude/commands/weekly-review.md` |
| draft-review | `.claude/commands/draft-review.md` |
| customise | `.claude/commands/customise.md` |
| new-view | `.claude/commands/new-view.md` |

## Operating rules

Every mutation records the real requesting operator. Reviewer names must differ from owner and author, but they are asserted identities rather than authenticated signatures. Never invent a reviewer, evidence or an outcome. A database owner can alter records. This is a trusted-operator desk, not tenant access control or tamper-proof evidence storage.

The rehearsal worker always uses disposable PGlite. It has no production connection, and its assertions prove only the supplied fixture. Release packs export scripts without executing them. The baseline is a test fixture, not a production setup script. Production changes, backup checks and recovery stay with the authorised deployment process. Never execute a pack without explicit authority and representative staging validation.

Revisions preserve earlier versions and require a new rehearsal and approval. A repeat rehearsal needs a fresh approval. Failed deployments can later be recorded as rolled back, never silently replaced with success. Imported Liquibase history stays separate and preserves execution types. Investigate conflicting history instead of overwriting it.

Use docs/compliance.md to separate NIST guidance from local workflow policy. No deletion command exists. Keep personal or production data out of demo fixtures and public repositories. Private inputs belong in ignored imports/, exports/ and release-packs/ folders.

DATABASE_URL selects the desk's Postgres connection. Otherwise PGlite persists in .data/db. npm test ignores production DATABASE_URL and uses temporary embedded data unless TEST_DATABASE_URL explicitly names an empty disposable database. Seed only demos. Back up the database and linked evidence separately and test recovery before cutover.

Never send or publish from this desk. Draft to drafts/. Add schema changes in new migrations, never by rewriting applied files. Use the same command library in Claude Code, Codex, OpenCode and Cursor.

Omni by Enterprise DNA customises and operates this system. One setup fee, then a retainer.
