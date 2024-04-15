#!/usr/bin/env bash

# set envs and setup test db 

# Exit script
handle_sigint() {
    echo "Script interrupted by Ctrl+C"
    yarn docker:stop test-db
    exit 1
}

# Set the trap to call handle_sigint when SIGINT is received
trap handle_sigint SIGINT

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
yarn migrate:data -s users
