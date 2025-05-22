## Description

Service using `ElysiaJS` and `Kysely`, running with Bun.

## Installation

This project is using Bun to run, which is a new alternative to Node.js that can run TS files natively and it is also much faster.

To install the service, be sure you have installed Bun runtime. Then you can install dependencies and set secrets into your env file.

```bash
bun install
```

## Getting started

If you wish, you can run all the other dependant services with Docker Compose.

```bash
cd docker
docker compose up
```

Then simply run the app.

```bash
bun start
bun dev # in watch mode
```

## Tests

The app has unit tests, integration tests and E2E tests implemented. Unit and integration tests are usually in the file next to the file with the logic.
However E2E tests are in the `test` folder in the root directory.

> Before running the tests, please be sure what database are you connecting to!

```bash
bun test:unit
bun test:e2e
```

## Database migrations

Migrations are handled by Kysely tooling. If you wish to change them, you can create a new migration by running the following command:

```bash
bun kysely migrate:make migration_name
```

To apply those migrations onto the database, just run the following and also generate types according to the schema.

```bash
bun kysely migrate:latest
bun kanel
```

## Documentation

This repository contains a [documentation](./docs/readme.md) that should help you to not get lost in the repo 😎