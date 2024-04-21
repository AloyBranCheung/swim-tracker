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

PRISMA_ENUM=""
case "$PROG_CAT" in
    beginner)
        PRISMA_ENUM="ProgramLevel.BEGINNER"
        ;;
    intermediate)
        PRISMA_ENUM="ProgramLevel.INTERMEDIATE"
        ;;
    advanced)
        PRISMA_ENUM="ProgramLevel.ADVANCED"
        ;;
    *)
        echo "Unknown program level"
        exit 1
        ;;
esac


echo -n "Enter program week e.g. 4: "
read PROG_WEEK
PROG_WEEK=$(to_lower_case $PROG_WEEK)

TARG_DIR="./prisma/data-migrations"

# ---------------------------------------------------------------------------- #

# create swim program file boilerplate 
PROG_DIR="$TARG_DIR/swim-programs/$PROG_CAT-program$PROG_WEEK.ts"
touch $PROG_DIR
echo -e "\nCreating swim program file in:\n"
echo $PROG_DIR

cat <<EOF > $PROG_DIR
import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week $PROG_WEEK", $PROG_WEEK)
    // ! BEGIN EXAMPLE 
     .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 50,
        unit: "m",
        notes: "rest 30 sec.",
    })
    .addProgramToSwimProgram($PRISMA_ENUM) // add this line once all exercises are added
    // ! END EXAMPLE
    .build();
EOF

# create new migration file .ts and append run command to migrate.sh

NEW_FILE="migrate-add-$(date +%Y%m%d%H%M%S)_$1.ts"
NEW_FILE_DIR="$TARG_DIR/$NEW_FILE"

echo -e "\nCreating new migration file in:\n"
echo $NEW_FILE_DIR

touch $NEW_FILE_DIR

echo -e "\nnpx tsx $NEW_FILE_DIR" >> "./scripts/migrate.sh"

cat <<EOF > $NEW_FILE_DIR
import { ProgramLevel } from "@prisma/client"
// swim program
import {swimProgram} from "./swim-programs/$PROG_CAT-program$PROG_WEEK"
// utils
import addOneWeek from "./util/addoneweek"

const main = async () => {
    await addOneWeek(swimProgram, $PRISMA_ENUM)
}

main () 
EOF

# Done 
echo -e "\n# ---------------------------------------------------------------------------- #\n"
echo -e "Migration file created successfully in:\n$NEW_FILE_DIR \n"
echo -e "Swim Program file created in:\n$PROG_DIR \n"
echo -e "Added $NEW_FILE run command to migrate.sh \n"
echo "Happy editing :)"
