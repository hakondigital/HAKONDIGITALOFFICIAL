# Rollback Guide — Pre-Palantir Redesign

Backup created before the Palantir-style redesign was applied.

## Backup Details

- **Branch:** `backup/pre-palantir-redesign`
- **Tag:** `backup-palantir-pre-v1`
- **Last commit at time of backup:** `2664859 Fix hero pricing placement and headline copy`

---

## How to Rollback

### Option A — Switch to the backup branch

```bash
git switch backup/pre-palantir-redesign
```

This puts you in a detached/separate branch with the full original codebase intact.
Run `npm run dev` to verify it's working, then continue from there.

### Option B — Hard reset to the backup tag (nuclear option)

> **Warning:** This discards all commits made after the backup tag. Only do this if you want to fully abandon the redesign on the current branch.

```bash
git reset --hard backup-palantir-pre-v1
```

### Option C — Cherry-pick or diff

If you want to keep some of the redesign but revert specific files:

```bash
# See the diff between backup and current
git diff backup-palantir-pre-v1..HEAD -- src/app/globals.css

# Restore a single file from backup
git checkout backup-palantir-pre-v1 -- src/components/sections/Hero.tsx
```

---

## Verify the Rollback

After switching, confirm the dev server runs cleanly:

```bash
npm run dev
```

Then open `http://localhost:3000` to confirm the original design is restored.
