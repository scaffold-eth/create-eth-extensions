# Migrating Extensions to AI Skills

This document is a prompt/instruction for a Claude Code agent (or any AI agent) to migrate a traditional SE-2 extension into an AI skill.

## Background

SE-2 extensions currently use a template-based system — `.args.mjs` files, merge scripts, hardcoded configs — that mechanically patches files together. This only supports one extension at a time and produces brittle, rigid output.

We're replacing this with **AI skills**: knowledge documents that give an AI agent the understanding it needs to integrate a technology into an SE-2 project. The AI reads the skill and applies it intelligently, adapting to the actual project rather than blindly copying templates.

## Philosophy: The 7/10 Rule

On a scale of 1 to 10:
- **1** = Rigid step-by-step with exact code to copy (the old extension system)
- **10** = "Just read the docs and figure it out" with zero guidance

**We aim for 7.** That means:

- **Give examples as syntax references**, not as code to copy verbatim. Label them clearly — "Syntax example", "Reference implementation", "for reference". The AI should understand the pattern, not paste the code.
- **Don't dictate every decision.** Let the AI choose icons, decide page placement, pick component structure, design the UI. It knows the project context better than a static template.
- **Don't over-specify what the AI already knows.** If SE-2 has an AGENTS.md or the AI has access to project files, don't repeat that info in detail. A brief mention ("SE-2 uses DaisyUI + Tailwind") is enough.
- **Do provide the hard-to-discover knowledge.** Integration patterns between SE-2 and the technology, the correct import paths for virtual modules, SE-2-specific config bridges — this is what the AI genuinely needs and can't easily figure out on its own.
- **Do link to official docs** and encourage the AI to search the web or check docs for anything not covered. The skill isn't a complete reference for the technology — it's the SE-2 integration knowledge.
- **Don't hardcode dependency versions.** Use `latest` or minimum version ranges and point to npm/GitHub releases. Hardcoded versions go stale. The exception: if a specific version is known to break, note that.
- **Frame things as "here's how it works" not "do this".** Say "The config reads SE-2's deployed contracts" not "Create a file called ponder.config.ts with the following contents".

## SKILL.md Structure

Every skill is a single `SKILL.md` file at `skills/<name>/SKILL.md`. It's organized by **what the AI needs to know**, not a checklist of actions. Here's the section template:

### `# <Technology> Integration for Scaffold-ETH 2`

### `## Overview`

What the technology is, what it does, when to use this skill. Link to official docs. One short paragraph — keep it tight.

Include a line like: "For anything not covered here, refer to the [<Tech> docs](<url>) or search the web."

### `## SE-2 Project Context`

**This section should be consistent across all skills.** It provides the shared SE-2 knowledge any AI agent needs, followed by a short skill-specific paragraph.

The shared block should cover:

- **Two flavors**: SE-2 comes in Hardhat and Foundry flavors. Hardhat has contracts at `packages/hardhat/contracts/` with deploy scripts at `packages/hardhat/deploy/`. Foundry has contracts at `packages/foundry/contracts/` with deploy scripts at `packages/foundry/script/`. Check which `packages/hardhat` or `packages/foundry` exists to detect the flavor.
- **Shared frontend**: Both flavors share `packages/nextjs/` — React frontend (Next.js App Router, Tailwind + DaisyUI, RainbowKit, Wagmi, Viem). Uses `~~` path alias for imports.
- **Key files**: `packages/nextjs/contracts/deployedContracts.ts` (auto-generated after `yarn deploy`, ABIs + addresses + deployment block numbers, keyed by chain ID), `packages/nextjs/scaffold.config.ts` (project config including `targetNetworks`).
- **Root package.json**: Monorepo scripts that proxy into workspaces (`yarn chain`, `yarn deploy`, `yarn start`).

Then add a **skill-specific paragraph** explaining how this particular technology plugs into the SE-2 architecture. For example, Ponder's paragraph explains that it gets added as a new workspace and reads `deployedContracts` + `scaffold.config` from the nextjs package.

End with: "Look at the actual project structure and contracts before setting things up — adapt to what's there rather than following this skill rigidly."

Here's the shared block to copy into every SKILL.md (then append your skill-specific paragraph):

```markdown
## SE-2 Project Context

Scaffold-ETH 2 (SE-2) is a yarn (v3) monorepo for building dApps on Ethereum. It comes in two flavors based on the Solidity framework:

- **Hardhat flavor** — contracts at `packages/hardhat/contracts/`, deploy scripts at `packages/hardhat/deploy/`
- **Foundry flavor** — contracts at `packages/foundry/contracts/`, deploy scripts at `packages/foundry/script/`

Check which exists in the project to know the flavor. Both flavors share:

- **`packages/nextjs/`** — React frontend (Next.js App Router, Tailwind + DaisyUI, RainbowKit, Wagmi, Viem). Uses `~~` path alias for imports.
- **`packages/nextjs/contracts/deployedContracts.ts`** — auto-generated after `yarn deploy`, contains ABIs, addresses, and deployment block numbers for all contracts, keyed by chain ID.
- **`packages/nextjs/scaffold.config.ts`** — project config including `targetNetworks` (array of viem chain objects).
- **Root `package.json`** — monorepo scripts that proxy into workspaces (e.g. `yarn chain`, `yarn deploy`, `yarn start`).

<< Add a skill-specific paragraph here explaining how this technology integrates with the above >>

Look at the actual project structure and contracts before setting things up — adapt to what's there rather than following this skill rigidly.
```

### `## Dependencies & Scripts`

Concrete data — this section can be more specific since dependency names and script wiring are factual:

- **New package** `package.json` (if the integration adds a workspace) — use `latest` or minimum ranges for the technology's own packages, link to npm/releases
- **Additions to existing packages** (e.g., new deps in `packages/nextjs/`)
- **Root scripts** to wire up workspace commands
- **Environment variables** with a `.env.example` reference

### `## <Technology> Configuration`

The core integration knowledge. This is the section that varies most between skills. Organize by concern, not by file. For each concern:

- Explain the **pattern** — what it does and why
- Show a **reference example** with syntax — but make clear the AI should adapt it to the actual project
- Link to relevant docs for the full API

Common subsections:
- The SE-2 bridge/config (how the technology reads SE-2's data — this is usually the most important piece)
- Schema/data model definition
- Core logic (handlers, processors, resolvers — whatever the technology uses)
- API layer (if applicable)
- Boilerplate files (just list what's needed and why — don't inline entire configs if the AI can generate them from a one-line description)

### `## SE-2 Integration`

What changes in the existing SE-2 app:

- **Header navigation** — mention that a tab should be added, let the AI pick the icon and placement
- **Frontend** — describe the query/data pattern for connecting the frontend to the technology's API. Show a minimal fetch pattern for reference. Mention that SE-2 uses `@scaffold-ui/components` for blockchain/Ethereum components and DaisyUI + Tailwind for general component and styling. Let the AI build the actual UI.
- **Providers/wrappers** — note if any are needed (or explicitly say none are needed)

### `## Development & Deployment`

- How to run in development
- Link to official deployment docs
- Any SE-2-specific deployment notes

## Migration Process

When migrating an existing extension to a skill:

### 1. Read the existing extension thoroughly

Go through every file in `extension/` for that extension. Extract:
- Exact dependency names (but look up latest versions — don't carry over stale ones)
- Integration patterns (how it bridges to SE-2)
- Config files and their purpose
- Frontend components and query patterns

### 2. Scrape the technology's latest docs

The existing extension may be outdated. Check:
- Latest version on npm / GitHub releases
- Current docs for any API changes, renamed functions, new patterns
- Migration guides if the technology has had major version bumps

### 3. Write the SKILL.md

Follow the structure above. Key principles while writing:
- **Distill, don't copy.** The old extension has template files — extract the knowledge from them, don't reproduce them.
- **Integration patterns over file contents.** The SE-2 config bridge is knowledge. A tsconfig.json is boilerplate the AI can generate.
- **Examples are illustrations, not instructions.** Every code block should feel like "here's how the syntax works" not "paste this".
- **Link out generously.** The skill doesn't need to be a complete reference. Link to official docs for full APIs, deployment guides, advanced features.

### 4. Delete the old extension files

Remove the entire `extension/` directory (or the relevant extension's files).

### 5. Update the README

Add the new skill to the table in the root `README.md`.

## Quality Checklist

Before considering a migration complete:

- [ ] SKILL.md organized by knowledge concern, not step-by-step instructions
- [ ] No hardcoded dependency versions (uses `latest` or minimum ranges with links to check current versions)
- [ ] Docs links verified — point to latest/unversioned docs, not old versioned paths
- [ ] SE-2 context section uses the shared block + a skill-specific paragraph
- [ ] Contracts/flavors mentioned — AI knows to check for Hardhat vs Foundry
- [ ] SE-2 integration pattern preserved (the bridge between SE-2 and the technology)
- [ ] Code examples labeled as syntax references / illustrations, not templates to copy
- [ ] AI has freedom to make UI/UX decisions (icons, page placement, component structure)
- [ ] Links to official docs for anything beyond SE-2-specific integration
- [ ] Single SKILL.md file — everything in one place
- [ ] Old extension files deleted

## Reference

See `skills/ponder/SKILL.md` as the reference implementation of a migrated skill.
