# !/usr/bin/env bash

# early exit
# -e exit immediately if command returns a non-zero exit status
# -u exit immediately if a variable is referenced before being set
set -eu

# reading materials 
# https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash
# https://superuser.com/questions/1003760/what-does-eof-do
# https://www.freecodecamp.org/news/bash-commands-bash-ls-bash-head-bash-mv-and-bash-cat-explained-with-examples/

if [ -z $1 ]; then
    echo "No file_name provided, exiting"
    exit 1
fi

to_lower_case() {
    local input="$1"
    local lowercased
    lowercased=$(echo "$input" | tr '[:upper:]' '[:lower:]')
    echo "$lowercased"
}

# user input

echo -n "Enter program name e.g. Week 4: "
read PROG_NAME
PROG_NAME=$(to_lower_case $PROG_NAME)

echo -n "Program category e.g. beginner, intermediate, or advanced: "
read PROG_CAT
PROG_CAT=$(to_lower_case $PROG_CAT)

echo -n "Enter program week e.g. 4: "
read PROG_WEEK
PROG_WEEK=$(to_lower_case $PROG_WEEK)

# create new migration file .ts and append run command to migrate.sh

TARG_DIR="./prisma/data-migrations"
NEW_FILE="migrate-add-$(date +%Y%m%d%H%M%S)_$1.ts"
NEW_FILE_DIR="$TARG_DIR/$NEW_FILE"

echo -e"Creating new migration file in $NEW_FILE_DIR \n"

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

# create swim program file boilerplate 

PROG_DIR="$TARG_DIR/swim-programs/$PROG_CAT-program$PROG_WEEK.ts"
touch $PROG_DIR

cat <<EOF > $PROG_DIR
import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week $PROG_WEEK", $PROG_WEEK)
    // ! EXAMPLE 
     .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 50,
        unit: "m",
        notes: "rest 30 sec.",
    })
    .addProgramToSwimProgram(ProgramLevel.BEGINNER) // add this line once all exercises are added
    // ! END EXAMPLE
    .build();
EOF

# Done 
echo -e "Migration file created successfully in:\n$NEW_FILE_DIR \n"
echo -e "Swim Program file created in:\n$PROG_DIR \n"
echo "Added $NEW_FILE run command to migrate.sh \n"
echo "Happy editing :)"
