# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes. This file restates neither:
whoever changes the package has both, so it carries only what they don't — repo mechanics,
a change that looks right and is not, where the next thing gets added, a naming trap, a
build or test invocation particular to this repo.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **This is a fork, and upstream is a moving target.** `packageRepo` points at `sondreolav/ppq-private-mode-startos`; upstream is `Start9-Community/ppq-private-mode-startos`. Take upstream changes with `git merge upstream/main` — never by hand-copying files. A hand-copy leaves upstream's commits outside our history, so GitHub keeps reporting the fork as *N commits behind*, and the gap grows with every upstream release.
- **The package version tracks the vendored proxy, not upstream's wrapper version.** `version` in `startos/versions/current.ts` follows `ppq-private-mode-proxy/package.json` (currently `0.6.0`), while upstream's wrapper sits on its own `0.4.x` line. That makes `current.ts` a conflict on every upstream merge: keep our version, bump the revision (`0.6.0:5`), and write our own release notes.
- **Don't merge `upstream/next`.** `main` is the released line — upstream's `v0.4.1_1` tag sits on it. Our own tags use the same shape: `v0.6.0_5`, with an underscore because git refs cannot contain `:`.
- **`PPQ_ALLOWED_HOSTS` is derived from the binding's own addresses.** Never hardcode hostnames; `main.ts` resolves them reactively, so an address added later is picked up on the next restart.
- **Put package-owned settings in `store.json`, never in `config.json`** — the proxy rewrites `config.json` whole when a key is saved on the Status Page.
- **Don't set `PPQ_API_KEY`** — the proxy's own key store must stay the key's only owner, so the action and the Status Page write the same key.
- **A blank key field keeps the saved key; don't "fix" it to clear on empty** — it is how the action toggles logging without re-entering the key.
- **The key pattern is validated in the action** because upstream only validates on the Status Page — a malformed key written straight to `config.json` surfaces later as a 401 on the first request.
- **The task is `important`, not `critical`, on purpose.** A `critical` task suspends the ordinary controls, which would stop the user starting the service — and the Status Page is the other place a key can be saved.
- **Default branch is `main`, not `master`.** Keep `main` in every workflow when resyncing them from the template.
