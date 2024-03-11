#!/usr/bin/env bash

yarn run generate-client
ts-node ./prisma/data-migrations/migrate-users.ts | pino-pretty