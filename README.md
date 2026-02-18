# Scaffold-ETH 2 Extensions — AI Skills

AI skills for extending [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) projects. Each skill gives an AI agent the knowledge it needs to integrate a technology into an SE-2 app.

## Available Skills

| Skill | Description |
|-------|-------------|
| [Ponder](./skills/ponder/SKILL.md) | Blockchain event indexing with [Ponder](https://ponder.sh/) — automatically indexes deployed contract events and serves data via GraphQL |

## Usage

Install a skill using the sandgarden CLI:

```bash
npx skills add ponder
```

Or point your AI agent directly at the skill file (`skills/ponder/SKILL.md`) for the full integration knowledge.

## How Skills Work

Unlike traditional template-based extensions that merge files mechanically, skills are **knowledge documents**. They contain everything an AI agent needs to know — dependencies, configuration patterns, integration points, and examples — organized by concern rather than as rigid step-by-step instructions.

The AI reads the skill and applies it intelligently to the specific project, adapting to existing code and user preferences.
