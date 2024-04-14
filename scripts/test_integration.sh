#!/usr/bin/env bash

# get current dir e.g. executed in root but get {{root}}/scripts
DIR="$(cd "$(dirname "$0")" && pwd)"

# export envs within context of scripts
export $(grep -v '^#' .env.test | xargs)
echo "Database connection: $DATABASE_URL"

# # startup test-db 
yarn docker:only test-db 

# wait for db ready
echo '🟡 - Waiting for database to be ready...'
$DIR/wait_for_it.sh "${DATABASE_URL}" -- echo '🟢 - Database ready!'

# add tables + migrate data
yarn prisma migrate dev 
yarn migrate:data 

# # run tests
vitest -c vitest.config.integration.ts 

# # stop db
yarn docker:stop test-db