# Drizzle + Neon Extension

This extension uses Drizzle ORM to interact with the database, and it's optimized to work using Neon as the database provider.

First, spin up the database using `docker compose up`.

To iterate on the database schema locally:

- Tweak the schema in `schema.ts`
- Run `yarn drizzle-kit push` to apply the changes.
- Youn can run `yarn db:wipe` to wipe the database and start fresh.
- Run `yarn drizzle-kit studio` to spin up a UI to interact with the database.

Whenever the database schema is stable, you should switch to the migrations workflow:

- Initially and each time you change the schema, run `yarn drizzle-kit generate` to generate the migrations.
- Run `yarn drizzle-kit migrate` to apply the changes.

This extension also includes:

- An API endpoint to create a user: `/api/users`
- A page to list all users: `/users`
- A repository to interact with the users table: `services/database/repositories/users.ts`
