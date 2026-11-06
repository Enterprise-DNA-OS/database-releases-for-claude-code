# Bring Liquibase history into your own release desk

This imports execution history. It does not translate a Liquibase changelog or replace its migration execution engine. Keep your current deployment process running until any replacement has passed representative staging tests.

## Export

Use your approved database client to export DATABASECHANGELOG as CSV with headers. Liquibase documents this history structure in [DATABASECHANGELOG](https://docs.liquibase.com/secure/user-guide-5-1-1/what-is-the-databasechangelog-table). [Its offline mode](https://www.liquibase.com/blog/liquibase-without-a-database-connection) also describes a history CSV that mirrors that structure. Check that an offline copy is complete and current before using it.

Include ID, AUTHOR, FILENAME, DATEEXECUTED, ORDEREXECUTED, EXECTYPE and MD5SUM. Export one environment at a time. Preserve quoted fields, commas and exact filenames. Do not use a query filtered to only successful changes. Obtain an authorised export and preserve the original privately. The included example is synthetic and is not a captured vendor account.

## One-command import

After adding an environment, run:

```bash
npm run desk -- import liquibase imports/history.csv --environment="Production reporting" --dry-run --by="Migration operator"
npm run desk -- import liquibase imports/history.csv --environment="Production reporting" --by="Migration operator"
```

The dry run validates and rolls back all changes. The second command saves one atomic batch. Case-insensitive headers are accepted. Required fields cannot be empty. Duplicate changeset identities in a file fail. An existing matching identity is unchanged, while changed history causes the whole import to fail for investigation. Another environment can have the same identity without collision.

| Source | Destination |
|---|---|
| ID + AUTHOR + FILENAME | Composite changeset identity inside the chosen environment |
| DATEEXECUTED | Original date-time text, without guessing the source timezone |
| ORDEREXECUTED | Nonnegative execution order |
| EXECTYPE | EXECUTED, FAILED, SKIPPED, RERAN or MARK_RAN, kept exactly |
| MD5SUM | Original vendor checksum, not converted to a different algorithm |
| Other exported columns | Original source row preserved in JSON |

A null checksum stays unknown. MARK_RAN does not become evidence that a script executed. Imported history is kept separate from new release approvals and deployment records.

## Reconcile

Compare total rows, identities, execution types and checksum counts per environment. Run `compare-history imports/history.csv --environment="Production reporting"` against a complete snapshot. It reports new, changed and absent rows without writing. A partial export can appear to have missing rows, so confirm scope first. Conflicting history must be investigated against the original, never overwritten simply to pass import.

Export the desk with `npm run desk -- export exports/before-switch` and retain the original CSV privately. Back up the actual database and test recovery separately. Record a review note for the comparison.

## What needs separate work

XML, YAML and JSON changelog semantics, preconditions, contexts, labels, driver support, stored rollback instructions, policy packs, authentication, access permissions and vendor connections need separate migration and validation. Exporting DATABASECHANGELOG does not export those assets. Native PostgreSQL specifications in the new desk must be authored and tested independently. This tool has no production connection to the environments it describes.

History can move in a day when the export is ready. The whole switch depends on the engines, automation and controls your business needs. Enterprise DNA scopes that work as part of your custom version. Do not cancel a deployment service on the strength of a history import.
