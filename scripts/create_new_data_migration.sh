# !/usr/bin/env bash

# reading materials 
# https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash
# https://superuser.com/questions/1003760/what-does-eof-do
# https://www.freecodecamp.org/news/bash-commands-bash-ls-bash-head-bash-mv-and-bash-cat-explained-with-examples/

if [ -z $1 ]; then
    echo "No file_name provided, exiting"
    exit 1
fi

TARG_DIR="./prisma/data-migrations"
NEW_FILE="$(date +%Y%m%d%H%M%S)_$1.ts"
NEW_FILE_DIR="$TARG_DIR/$NEW_FILE"

echo "Creating new migration file in $NEW_FILE_DIR"

touch $NEW_FILE_DIR

echo -e "\nnpx tsx $NEW_FILE_DIR" >> "./scripts/migrate.sh"

cat <<EOF > $NEW_FILE_DIR
import { PrismaClient } from '@prisma/client';
import Pino from 'pino';

const prisma = new PrismaClient();

const logger = Pino({
    transport: {
        target: 'pino-pretty'
    }
})

const main = async () => {}

main () 
EOF

echo "Migration file created successfully"